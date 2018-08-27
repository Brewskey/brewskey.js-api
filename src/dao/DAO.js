// @flow
import type { EntityID, QueryOptions } from '../index';
import type oHandler from 'odata';

import nullthrows from 'nullthrows';
import BaseDAO from './BaseDAO';
import LoadObject from '../LoadObject';

class DAO<TEntity: { id: EntityID }, TEntityMutator> extends BaseDAO<
  TEntity,
  TEntityMutator,
> {
  static _clientID: number = 0;

  _countLoaderByQuery: Map<string, LoadObject<number>> = new Map();
  _entityIDsLoaderByQuery: Map<string, LoadObject<Array<EntityID>>> = new Map();
  _customLoaderByQuery: Map<string, LoadObject<any>> = new Map();
  _entityLoaderByID: Map<EntityID, LoadObject<TEntity>> = new Map();
  _subscriptions: Set<() => void> = new Set();

  deleteByID(id: EntityID): Promise<void> {
    const stringifiedID = id.toString();
    const entity =
      this._entityLoaderByID.get(stringifiedID) || LoadObject.empty();
    this._entityLoaderByID.set(stringifiedID, entity.deleting());
    this._emitChanges();

    return this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      /* params */ {},
      'delete',
    )
      .then(() => {
        this._entityLoaderByID.delete(id);
        this._flushQueryCaches();
        this._emitChanges();
      })
      .catch((error: Error) => {
        BaseDAO.__handleError(error);
        this._updateCacheForError(stringifiedID, error);
      });
  }

  count(queryOptions?: QueryOptions): LoadObject<number> {
    return this.__countCustom(
      (countQueryOptions: QueryOptions): oHandler<TEntity> =>
        this.__buildHandler({ ...queryOptions, ...countQueryOptions }),
      queryOptions,
    );
  }

  __countCustom(
    getOHandler: (baseQueryOptions: QueryOptions) => oHandler<*>,
    queryOptions?: QueryOptions,
    key?: string = '',
  ): LoadObject<number> {
    const cacheKey = this._getCacheKey(queryOptions) + key;

    if (!this._countLoaderByQuery.has(cacheKey)) {
      this._countLoaderByQuery.set(cacheKey, LoadObject.loading());
      this._emitChanges();

      this.__resolve(
        getOHandler({
          shouldCount: true,
          take: 0,
        }),
      )
        .then((result: Object) => {
          this._countLoaderByQuery.set(
            cacheKey,
            LoadObject.withValue(result.inlinecount),
          );
          this._emitChanges();
        })
        .catch((error: Error) => {
          BaseDAO.__handleError(error);
          const loader = this._countLoaderByQuery.get(cacheKey);
          this._countLoaderByQuery.set(
            cacheKey,
            loader ? loader.setError(error) : LoadObject.withError(error),
          );
          this._emitChanges();
        });
    }

    return nullthrows(this._countLoaderByQuery.get(cacheKey));
  }

  fetchByID(id: EntityID): LoadObject<TEntity> {
    const stringifiedID = id.toString();
    if (!this._entityLoaderByID.has(stringifiedID)) {
      this._entityLoaderByID.set(stringifiedID, LoadObject.loading());
      this._emitChanges();
      this.__resolveSingle(
        this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      )
        .then((result: TEntity): void => this._updateCacheForEntity(result))
        .catch((error: Error) => {
          BaseDAO.__handleError(error);
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
      handler.customParam(
        'ids',
        idsToLoad.map(this.__reformatIDValue).join(','),
      );

      this.__resolveMany(handler)
        .then((results: Array<TEntity>) => {
          const entitiesByID = new Map(
            results.map((item: TEntity): [EntityID, TEntity] => [
              item.id,
              item,
            ]),
          );

          idsToLoad.forEach((id: EntityID) => {
            const entity = entitiesByID.get(id);
            if (entity) {
              this._updateCacheForEntity(entity);
            } else {
              this._updateCacheForError(
                id,
                new Error(
                  `Could not load ${this.getEntityName()} ${id.toString()}`,
                ),
              );
            }
          });

          this._emitChanges();
        })
        .catch((error: Error) => {
          BaseDAO.__handleError(error);
          stringifiedIds.forEach((id: EntityID): void =>
            this._updateCacheForError(id, error, false),
          );

          this._emitChanges();
        });
    }

    return new Map(
      stringifiedIds.map((id: string): [string, LoadObject<TEntity>] => [
        id,
        nullthrows(this._entityLoaderByID.get(id)),
      ]),
    );
  }

  fetchMany(
    queryOptions?: QueryOptions,
  ): LoadObject<Array<LoadObject<TEntity>>> {
    const cacheKey = this._getCacheKey(queryOptions);

    if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
      this._entityIDsLoaderByQuery.set(cacheKey, LoadObject.loading());
      this._emitChanges();

      let handler = this.__buildHandler(queryOptions, false);
      handler = handler.select('id');

      this.__resolveManyIDs(handler)
        .then((ids: Array<EntityID>) => {
          const stringifiedIds = ids.map(String);
          this._entityIDsLoaderByQuery.set(
            cacheKey,
            LoadObject.withValue(stringifiedIds),
          );
          this._emitChanges();
          this.fetchByIDs(stringifiedIds);
        })
        .catch((error: Error) => {
          BaseDAO.__handleError(error);
          const loader = this._entityIDsLoaderByQuery.get(cacheKey);
          this._entityIDsLoaderByQuery.set(
            cacheKey,
            loader ? loader.setError(error) : LoadObject.withError(error),
          );
          this._emitChanges();
        });
    }

    return nullthrows(this._entityIDsLoaderByQuery.get(cacheKey)).map(
      (ids: Array<EntityID>): Array<LoadObject<TEntity>> => {
        const resultMap = this.fetchByIDs(ids);
        return ids.map((id: EntityID): LoadObject<TEntity> =>
          nullthrows(resultMap.get(id.toString())),
        );
      },
    );
  }

  flushCache() {
    this._entityLoaderByID = new Map();
    this._flushQueryCaches();
    this._emitChanges();
  }

  flushCacheForEntity(entityID: EntityID) {
    this._entityLoaderByID.delete(entityID);
    this._emitChanges();
  }

  flushCustomCache() {
    this._customLoaderByQuery = new Map();
    this._emitChanges();
  }

  flushQueryCaches() {
    this._flushQueryCaches();
    this._emitChanges();
  }

  patch(id: EntityID, mutator: TEntityMutator) {
    const stringifiedID = id.toString();
    const entity =
      this._entityLoaderByID.get(stringifiedID) || LoadObject.empty();
    this._entityLoaderByID.set(stringifiedID, entity.updating());
    this._emitChanges();

    this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      this.getTranslator().toApi(mutator),
      'patch',
    )
      .then((result: TEntity) => {
        this._flushQueryCaches();
        this._updateCacheForEntity(result);
      })
      .catch((error: Error) => {
        BaseDAO.__handleError(error);
        this._updateCacheForError(stringifiedID, error);
      });
  }

  post(mutator: TEntityMutator): EntityID {
    DAO._clientID += 1;
    const clientID = `CLIENT_ID:${DAO._clientID}`;
    this._entityLoaderByID.set(clientID, LoadObject.loading());
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
        this._emitChanges();
      })
      .catch((error: Error) => {
        BaseDAO.__handleError(error);
        this._entityLoaderByID.set(clientID, LoadObject.withError(error));
        this._emitChanges();
      });
    return clientID;
  }

  put(id: EntityID, mutator: TEntityMutator) {
    const stringifiedID = id.toString();
    const entity =
      this._entityLoaderByID.get(stringifiedID) || LoadObject.empty();
    this._entityLoaderByID.set(stringifiedID, entity.updating());
    this._emitChanges();

    this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      this.getTranslator().toApi(mutator),
      'put',
    )
      .then((result: TEntity) => {
        this._updateCacheForEntity(result);
      })
      .catch((error: Error) => {
        BaseDAO.__handleError(error);
        this._updateCacheForError(stringifiedID, error);
      });
  }

  subscribe(handler: () => void) {
    this._subscriptions.add(handler);
  }

  unsubscribe(handler: () => void) {
    this._subscriptions.delete(handler);
  }

  waitForLoaded<TResponse>(
    fn: () => LoadObject<TResponse>,
    timeout?: number = 10000,
  ): Promise<TResponse> {
    return new Promise(
      (
        resolve: (response: TResponse) => void,
        reject: (error: Error) => void,
      ) => {
        setTimeout((): void => reject(new Error('Timeout!')), timeout);

        const fetchAndResolve = () => {
          const loader = fn().map((result: $FlowFixMe): $FlowFixMe => {
            if (!Array.isArray(result)) {
              return result;
            }

            if (
              result.some(
                (item: $FlowFixMe): boolean =>
                  item instanceof LoadObject ? item.isLoading() : false,
              )
            ) {
              return LoadObject.loading();
            }

            return result;
          });

          if (loader.isLoading()) {
            return;
          }

          this.unsubscribe(fetchAndResolve);

          if (loader.hasError()) {
            reject(loader.getErrorEnforcing());
            return;
          }

          resolve(loader.getValueEnforcing());
        };

        this.subscribe(fetchAndResolve);
        fetchAndResolve();
      },
    );
  }

  __fetchCustom<TResult>(
    handler: oHandler<TEntity>,
    queryOptions?: QueryOptions,
    key?: string = '',
  ): LoadObject<TResult> {
    const cacheKey = this._getCacheKey(queryOptions) + key;

    if (!this._customLoaderByQuery.has(cacheKey)) {
      this._customLoaderByQuery.set(cacheKey, LoadObject.loading());
      this._emitChanges();

      this.__resolve(handler)
        .then((result: Object) => {
          this._customLoaderByQuery.set(
            cacheKey,
            LoadObject.withValue(result.data),
          );
          this._emitChanges();
        })
        .catch((error: Error) => {
          BaseDAO.__handleError(error);
          this._customLoaderByQuery.set(cacheKey, LoadObject.withError(error));
          this._emitChanges();
        });
    }

    return nullthrows(this._customLoaderByQuery.get(cacheKey));
  }

  _emitChanges() {
    this._subscriptions.forEach((handler: () => void): void => handler());
  }

  _flushQueryCaches() {
    this._entityIDsLoaderByQuery = new Map();
    this._customLoaderByQuery = new Map();
    this._countLoaderByQuery = new Map();
  }

  _getCacheKey(queryOptions?: QueryOptions): string {
    return JSON.stringify(queryOptions || '_');
  }

  _updateCacheForEntity(entity: TEntity, shouldEmitChanges: boolean = true) {
    this._entityLoaderByID.set(entity.id, LoadObject.withValue(entity));
    if (shouldEmitChanges) {
      this._emitChanges();
    }
  }

  _updateCacheForError(
    id: EntityID,
    error: Error,
    shouldEmitChanges: boolean = true,
  ) {
    this._entityLoaderByID.set(id, LoadObject.withError(error));
    if (shouldEmitChanges) {
      this._emitChanges();
    }
  }
}

export default DAO;
