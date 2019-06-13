// @flow

import type OHandler from 'odata';
import type { EntityID, QueryOptions } from '../index';

import nullthrows from 'nullthrows';
import debounce from 'debounce';
import BaseODataDAO from './BaseODataDAO';
import LoadObject from '../LoadObject';
import Subscription from './Subscription';
import arrayFlatten from 'array-flatten';

const STANDARD_PAGE_SIZE = 40;

class ODataDAO<TEntity: { id: EntityID }, TEntityMutator> extends BaseODataDAO<
  TEntity,
  TEntityMutator,
> {
  static _clientID: number = 0;

  _countLoaderByQuery: Map<string, LoadObject<number>> = new Map();

  _entityIDsLoaderByQuery: Map<string, LoadObject<Array<EntityID>>> = new Map();

  _customLoaderByQuery: Map<string, LoadObject<any>> = new Map();

  _entityLoaderByID: Map<EntityID, LoadObject<TEntity>> = new Map();

  // Sets used for tracking current queries
  _runFlushCache = null;

  _currentCountQueries: Set<string> = new Set();

  _currentEntityIDsQueries: Set<string> = new Set();

  _currentCustomQueries: Set<string> = new Set();

  deleteByID(id: EntityID): EntityID {
    const stringifiedID = id.toString();
    const entity =
      this._entityLoaderByID.get(stringifiedID) || LoadObject.empty();
    this._entityLoaderByID.set(stringifiedID, entity.deleting());

    const clientID = this._getClientID();
    this._entityLoaderByID.set(clientID, LoadObject.empty().deleting());

    this.__emitChanges();

    this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      /* params */ {},
      'delete',
    )
      .then(() => {
        this._entityLoaderByID.set(clientID, LoadObject.empty());
        this._entityLoaderByID.set(id, LoadObject.empty());
        this.__emitChanges();
        this._flushQueryCaches();
        this.__emitChanges();
      })
      .catch((error: Error) => {
        Subscription.__emitError(error);
        this._updateCacheForError(clientID, error);
      });

    return clientID;
  }

  count(queryOptions?: QueryOptions): LoadObject<number> {
    return this.__countCustom(
      (countQueryOptions: QueryOptions): OHandler<TEntity> =>
        this.__buildHandler({ ...countQueryOptions }),
      queryOptions,
    );
  }

  __countCustom(
    getOHandler: (baseQueryOptions: QueryOptions) => OHandler<*>,
    queryOptions?: QueryOptions = {},
    key?: string = '',
  ): LoadObject<number> {
    const baseQueryOptions = this._getCountQueryOptions(queryOptions);

    const cacheKey = this._getCacheKey({
      ...baseQueryOptions,
      __custom_key__: key,
    });

    this._currentCountQueries.add(cacheKey);

    if (!this._countLoaderByQuery.has(cacheKey)) {
      this._hydrateCount(getOHandler, baseQueryOptions, key);
    }

    return nullthrows(this._countLoaderByQuery.get(cacheKey));
  }

  getEntitiesCache(): Array<LoadObject<TEntity>> {
    return Array.from(this._entityLoaderByID.values());
  }

  fetchByID(id: EntityID): LoadObject<TEntity> {
    const stringifiedID = id.toString();
    if (!this._entityLoaderByID.has(stringifiedID)) {
      this._entityLoaderByID.set(stringifiedID, LoadObject.loading());
      this.__emitChanges();
      this.__resolveSingle(
        this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      )
        .then((result: TEntity): void => this._updateCacheForEntity(result))
        .catch((error: Error) => {
          Subscription.__emitError(error);
          this._updateCacheForError(stringifiedID, error);
        });
    }

    return nullthrows(this._entityLoaderByID.get(stringifiedID));
  }

  fetchByIDs(ids: Array<EntityID>): Map<string, LoadObject<TEntity>> {
    const stringifiedIds = ids.map(String);
    const idsToLoad = stringifiedIds.filter(
      (id: EntityID): boolean => !this._entityLoaderByID.has(id),
    );

    if (idsToLoad.length) {
      idsToLoad.forEach((id: EntityID) => {
        this._entityLoaderByID.set(id.toString(), LoadObject.loading());
      });

      // This URI will look like `pours/Default.GetManyByIDs(ids=['58','59'])/`
      const handler = this.__buildHandler();
      handler.customParam('ids', idsToLoad.join(','));

      this.__resolveMany(handler)
        .then((results: Array<TEntity>) => {
          const entitiesByID = new Map(
            results.map(
              (item: TEntity): [EntityID, TEntity] => [item.id, item],
            ),
          );

          idsToLoad.forEach((id: EntityID) => {
            const entity = entitiesByID.get(id);
            if (entity) {
              this._updateCacheForEntity(entity, false);
            } else {
              this._updateCacheForError(
                id,
                new Error(
                  `Could not load ${this.getEntityName()} ${id.toString()}`,
                ),
              );
            }
          });

          this.__emitChanges();
        })
        .catch((error: Error) => {
          Subscription.__emitError(error);
          stringifiedIds.forEach(
            (id: EntityID): void => this._updateCacheForError(id, error, false),
          );

          this.__emitChanges();
        });
    }

    return new Map(
      stringifiedIds.map(
        (id: string): [string, LoadObject<TEntity>] => [
          id,
          nullthrows(this._entityLoaderByID.get(id)),
        ],
      ),
    );
  }

  fetchMany(
    queryOptions?: QueryOptions = {},
  ): LoadObject<Array<LoadObject<TEntity>>> {
    const cacheKey = this._getCacheKey(queryOptions);
    this._currentEntityIDsQueries.add(cacheKey);

    if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
      this._hydrateMany(queryOptions);
    }

    const countQueryKey = this._getCacheKey({
      ...this._getCountQueryOptions(queryOptions),
      __custom_key__: '',
    });
    const loader =
      this._countLoaderByQuery.get(countQueryKey) || LoadObject.withValue(-1);

    return loader.map(count =>
      nullthrows(this._entityIDsLoaderByQuery.get(cacheKey))
        .map(
          (ids: Array<EntityID>): Array<LoadObject<TEntity>> => {
            const resultMap = this.fetchByIDs(ids);

            return ids.map(
              (id: EntityID): LoadObject<TEntity> =>
                nullthrows(resultMap.get(id.toString())),
            );
          },
        )
        .map(loaders => {
          const { take = 100 } = queryOptions;

          const delta = (count % take) - loaders.length;
          if (count === -1 || loaders.length === take || delta <= 0) {
            return loaders;
          }

          const missedLoaders = [...Array(delta)].map(() =>
            LoadObject.loading(),
          );

          return [...loaders, ...missedLoaders];
        }),
    );
  }

  fetchAll(
    queryOptions?: QueryOptions,
  ): LoadObject<Array<LoadObject<TEntity>>> {
    return this.count(queryOptions).map(count =>
      arrayFlatten(
        [...Array(Math.ceil(count / STANDARD_PAGE_SIZE))].map((_, index) => {
          const skip = STANDARD_PAGE_SIZE * index;
          const loader = this.fetchMany({
            ...queryOptions,
            skip,
            take: STANDARD_PAGE_SIZE,
          });

          const itemLoaders = [
            ...Array(Math.min(STANDARD_PAGE_SIZE, count - skip)),
          ];

          if (loader.isLoading()) {
            return itemLoaders.map(() => LoadObject.loading());
          }

          if (loader.hasError()) {
            return itemLoaders.map(() =>
              LoadObject.withError(loader.getErrorEnforcing()),
            );
          }

          return loader.getValueEnforcing();
        }),
      ),
    );
  }

  fetchSingle(queryOptions?: QueryOptions): LoadObject<TEntity> {
    const combinedQueryOptions = {
      orderBy: [{ column: 'id', direction: 'desc' }],
      ...queryOptions,
      take: 1,
    };

    return this.fetchMany(combinedQueryOptions).map(
      (items: Array<LoadObject<TEntity>>): LoadObject<TEntity> =>
        items[0] || LoadObject.empty(),
    );
  }

  flushCache() {
    this._entityLoaderByID = new Map();
    this._flushQueryCaches();
    this.__emitChanges();
  }

  flushCacheForEntity(entityID: EntityID) {
    this._entityLoaderByID.delete(entityID);
    this.__emitChanges();
  }

  flushCustomCache() {
    this._flushCustomCache();
  }

  flushQueryCaches() {
    this._flushQueryCaches();
    this.__emitChanges();
  }

  patch(id: EntityID, mutator: TEntityMutator): EntityID {
    const stringifiedID = id.toString();
    const entity =
      this._entityLoaderByID.get(stringifiedID) || LoadObject.empty();
    this._entityLoaderByID.set(stringifiedID, entity.updating());

    const clientID = this._getClientID();
    this._entityLoaderByID.set(clientID, entity.updating());

    this.__emitChanges();

    this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      this.getTranslator().toApi(mutator),
      'patch',
    )
      .then((result: TEntity) => {
        this._flushQueryCaches();
        this._updateCacheForEntity(result, false);
        this._entityLoaderByID.set(
          clientID,
          nullthrows(this._entityLoaderByID.get(result.id)),
        );

        this.__emitChanges();
      })
      .catch((error: Error) => {
        Subscription.__emitError(error);
        this._updateCacheForError(clientID, error);
      });

    return clientID;
  }

  post(mutator: TEntityMutator): EntityID {
    const clientID = this._getClientID();
    this._entityLoaderByID.set(clientID, LoadObject.creating());
    this.__resolveSingle(
      this.__buildHandler(),
      this.getTranslator().toApi(mutator),
      'post',
    )
      .then((result: TEntity) => {
        this._flushQueryCaches();
        this._updateCacheForEntity(result, false);
        // The clientID has a reference to the load object
        this._entityLoaderByID.set(
          clientID,
          nullthrows(this._entityLoaderByID.get(result.id)),
        );
        this.__emitChanges();
      })
      .catch((error: Error) => {
        Subscription.__emitError(error);
        this._entityLoaderByID.set(clientID, LoadObject.withError(error));
        this.__emitChanges();
      });
    return clientID;
  }

  put(id: EntityID, mutator: TEntityMutator): EntityID {
    const stringifiedID = id.toString();
    const entity =
      this._entityLoaderByID.get(stringifiedID) || LoadObject.empty();
    this._entityLoaderByID.set(stringifiedID, entity.updating());

    const clientID = this._getClientID();
    this._entityLoaderByID.set(clientID, entity.updating());

    this.__emitChanges();

    this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      this.getTranslator().toApi(mutator),
      'put',
    )
      .then((result: TEntity) => {
        this._flushQueryCaches();
        this._updateCacheForEntity(result, false);
        // The clientID has a reference to the load object
        this._entityLoaderByID.set(
          clientID,
          nullthrows(this._entityLoaderByID.get(result.id)),
        );
        this.__emitChanges();
      })
      .catch((error: Error) => {
        Subscription.__emitError(error);
        this._updateCacheForError(clientID, error);
      });

    return clientID;
  }

  waitForLoaded<TResponse>(
    fn: this => LoadObject<TResponse>,
    timeout?: number,
  ): Promise<TResponse> {
    return this.waitForLoadedNullable(fn, timeout).then(result =>
      nullthrows(result),
    );
  }

  waitForLoadedNullable<TResponse>(
    fn: this => LoadObject<TResponse> | Map<string, LoadObject<TEntity>>,
    timeout?: number = 10000,
  ): Promise<?TResponse> {
    return new Promise(
      (
        resolve: (response: ?TResponse) => void,
        reject: (error: Error) => void,
      ) => {
        setTimeout((): void => reject(new Error('Timeout!')), timeout);

        const fetchAndResolve = () => {
          let loader = LoadObject.withValue(fn(this));

          if (loader.hasOperation()) {
            return;
          }

          loader = loader.map(
            (result: $FlowFixMe): $FlowFixMe => {
              const isMap = result instanceof Map;
              if (!Array.isArray(result) && !isMap) {
                return result;
              }

              const entries = isMap ? Array.from(result.values()) : result;
              if (
                entries.some(
                  (item: $FlowFixMe): boolean =>
                    item instanceof LoadObject ? item.hasOperation() : false,
                )
              ) {
                return LoadObject.loading();
              }

              if (isMap) {
                return new Map(
                  Array.from(result.entries()).map(([key, value]) => [
                    key,
                    value.getValue(),
                  ]),
                );
              }

              return result.map(
                (item: $FlowFixMe): $FlowFixMe =>
                  item instanceof LoadObject ? item.getValue() : item,
              );
            },
          );

          if (loader.hasOperation()) {
            return;
          }

          this.unsubscribe(fetchAndResolve);

          if (loader.hasError()) {
            reject(loader.getErrorEnforcing());
            return;
          }

          resolve(loader.getValue());
        };

        this.subscribe(fetchAndResolve);
        fetchAndResolve();
      },
    );
  }

  __mutateCustom(
    handler: OHandler<TEntity>,
    method: 'delete' | 'patch' | 'post' | 'put',
    id: ?string,
    mutator: ?Object = null,
  ): string {
    let stringifiedID = null;
    if (id) {
      stringifiedID = id.toString();
    }

    const clientID = this._getClientID();

    const entity =
      this._entityLoaderByID.get(stringifiedID || clientID) ||
      LoadObject.empty();

    if (method === 'delete') {
      this._entityLoaderByID.set(stringifiedID || clientID, entity.deleting());
    } else {
      this._entityLoaderByID.set(stringifiedID || clientID, entity.updating());
    }
    this.__emitChanges();

    this.__resolve(handler, mutator, method)
      // TODO - We need to rethink how the chache should be changed here..
      // I'm not sure what the expected behavior is for this response. Is it
      // standardized?
      .then((result: any) => {
        if (stringifiedID) {
          // We want whatever uses this store to refetch the entity
          this._entityLoaderByID.delete(stringifiedID);
        } else {
          this._updateCacheForEntity(result, false);
          this._entityLoaderByID.set(
            clientID,
            nullthrows(this._entityLoaderByID.get(result.id)),
          );
        }
        this.__emitChanges();
      })
      .catch((error: Error) => {
        Subscription.__emitError(error);
        this._updateCacheForError(stringifiedID || clientID, error);
      });

    return stringifiedID || clientID;
  }

  __fetchCustom<TResult>(
    handler: OHandler<TEntity>,
    queryOptions?: QueryOptions,
    key?: string = '',
  ): LoadObject<TResult> {
    const cacheKey = this._getCacheKey({
      ...queryOptions,
      __custom_key__: key,
    });
    this._currentCustomQueries.add(cacheKey);

    if (!this._customLoaderByQuery.has(cacheKey)) {
      this._customLoaderByQuery.set(cacheKey, LoadObject.loading());
      this.__emitChanges();

      this.__resolve(handler)
        .then((result: Object) => {
          this._customLoaderByQuery.set(
            cacheKey,
            LoadObject.withValue(result.data),
          );
          this.__emitChanges();
        })
        .catch((error: Error) => {
          Subscription.__emitError(error);
          this._customLoaderByQuery.set(cacheKey, LoadObject.withError(error));
          this.__emitChanges();
        });
    }

    return nullthrows(this._customLoaderByQuery.get(cacheKey));
  }

  _getClientID(): string {
    ODataDAO._clientID += 1;
    return `CLIENT_ID:${ODataDAO._clientID}`;
  }

  _flushQueryCaches() {
    if (this._runFlushCache) {
      return;
    }

    this._currentCountQueries.clear();
    this._currentCustomQueries.clear();
    this._currentEntityIDsQueries.clear();

    this._setLoadersToUpdating(this._entityIDsLoaderByQuery);
    this._setLoadersToUpdating(this._countLoaderByQuery);
    this._setLoadersToUpdating(this._customLoaderByQuery);

    this._runFlushCache = debounce(() => {
      this._entityIDsLoaderByQuery = this._rebuildMap(
        this._entityIDsLoaderByQuery,
        this._currentEntityIDsQueries,
        queryOptions => this._hydrateMany(queryOptions),
      );

      this._countLoaderByQuery = this._rebuildMap(
        this._countLoaderByQuery,
        this._currentCountQueries,
        queryOptions =>
          this._hydrateCount(
            countQueryOptions =>
              this.__buildHandler({ ...queryOptions, ...countQueryOptions }),
            queryOptions,
          ),
      );

      // TODO
      this._customLoaderByQuery = new Map();

      this._runFlushCache = null;
      this.__emitChanges();
    }, 10);

    this._runFlushCache();
  }

  _flushCustomCache() {
    if (this._runFlushCache) {
      return;
    }

    this._currentCountQueries.clear();
    this._currentCustomQueries.clear();
    this._currentEntityIDsQueries.clear();

    this._setLoadersToUpdating(this._customLoaderByQuery);
    this._runFlushCache = debounce(() => {
      this._customLoaderByQuery = new Map();

      this._runFlushCache = null;
      this.__emitChanges();
    }, 10);

    this._runFlushCache();
  }

  _setLoadersToUpdating(map: Map<string, LoadObject<any>>) {
    map.forEach((value, key) => map.set(key, value.updating()));
  }

  _rebuildMap(
    map: Map<string, LoadObject<any>>,
    set: Set<string>,
    onUpdate: (queryOptions?: QueryOptions) => void,
  ): Map<string, LoadObject<any>> {
    const savedItems = Array.from(set).map(queryOptionString => {
      onUpdate(JSON.parse(queryOptionString));

      const loader = nullthrows(map.get(queryOptionString));
      return [queryOptionString, loader];
    });

    return new Map(savedItems);
  }

  _hydrateMany(queryOptions?: QueryOptions): void {
    const cacheKey = this._getCacheKey(queryOptions);

    const initialLoader = this._entityIDsLoaderByQuery.has(cacheKey)
      ? nullthrows(this._entityIDsLoaderByQuery.get(cacheKey)).updating()
      : LoadObject.loading();

    this._entityIDsLoaderByQuery.set(cacheKey, initialLoader);
    this.__emitChanges();

    let handler = this.__buildHandler(queryOptions, false);
    handler = handler.select('id');

    this.__resolveManyIDs(handler)
      .then((ids: Array<EntityID>) => {
        const stringifiedIds = ids.map(String);
        this._entityIDsLoaderByQuery.set(
          cacheKey,
          LoadObject.withValue(stringifiedIds),
        );
        this.__emitChanges();
        this.fetchByIDs(stringifiedIds);
      })
      .catch((error: Error) => {
        Subscription.__emitError(error);
        const loader = this._entityIDsLoaderByQuery.get(cacheKey);
        this._entityIDsLoaderByQuery.set(
          cacheKey,
          loader ? loader.setError(error) : LoadObject.withError(error),
        );
        this.__emitChanges();
      });
  }

  _hydrateCount(
    getOHandler: (baseQueryOptions: QueryOptions) => OHandler<*>,
    queryOptions?: QueryOptions,
    key?: string = '',
  ): void {
    const baseQueryOptions = this._getCountQueryOptions(queryOptions);

    const cacheKey = this._getCacheKey({
      ...baseQueryOptions,
      __custom_key__: key,
    });

    const initialLoader = this._countLoaderByQuery.has(cacheKey)
      ? nullthrows(this._countLoaderByQuery.get(cacheKey)).updating()
      : LoadObject.loading();

    this._countLoaderByQuery.set(cacheKey, initialLoader);
    this.__emitChanges();

    this.__resolve(
      getOHandler({
        ...baseQueryOptions,
        shouldCount: true,
        take: 0,
      }),
    )
      .then((result: Object) => {
        this._countLoaderByQuery.set(
          cacheKey,
          LoadObject.withValue(result.inlinecount),
        );
        this.__emitChanges();
      })
      .catch((error: Error) => {
        Subscription.__emitError(error);
        const loader = this._countLoaderByQuery.get(cacheKey);
        this._countLoaderByQuery.set(
          cacheKey,
          loader ? loader.setError(error) : LoadObject.withError(error),
        );
        this.__emitChanges();
      });
  }

  _getCacheKey(queryOptions?: QueryOptions): string {
    return JSON.stringify(queryOptions || '_');
  }

  _getCountQueryOptions(queryOptions?: QueryOptions = {}): QueryOptions {
    const { orderBy, skip, take, ...countQueryOptions } = queryOptions;
    return (countQueryOptions: any);
  }

  _updateCacheForEntity(entity: TEntity, shouldEmitChanges: boolean = true) {
    this._entityLoaderByID.set(
      entity.id.toString(),
      LoadObject.withValue(entity),
    );
    if (shouldEmitChanges) {
      this.__emitChanges();
    }
  }

  _updateCacheForError(
    id: EntityID,
    error: Error,
    shouldEmitChanges: boolean = true,
  ) {
    this._entityLoaderByID.set(id.toString(), LoadObject.withError(error));
    if (shouldEmitChanges) {
      this.__emitChanges();
    }
  }
}

export default ODataDAO;
