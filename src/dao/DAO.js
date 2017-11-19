// @flow
import type { EntityID, QueryOptions } from '../index';

import nullthrows from 'nullthrows';
import BaseDAO from './BaseDAO';
import LoadObject from '../LoadObject';

class DAO<TEntity: { id: EntityID }, TEntityMutator> extends BaseDAO<
  TEntity,
  TEntityMutator,
> {
  _countLoaderByQuery: Map<string, LoadObject<number>> = new Map();
  _entityIDsLoaderByQuery: Map<string, LoadObject<Array<EntityID>>> = new Map();
  _entityLoaderByID: Map<EntityID, LoadObject<TEntity>> = new Map();
  _subscriptions: Set<() => void> = new Set();

  deleteByID(id: EntityID) {
    const entity = this._entityLoaderByID.get(id);
    if (!entity) {
      return;
    }

    this._entityLoaderByID.set(id, entity.deleting());
    this._emitChanges();

    this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(id)),
      /* params */ {},
      'delete',
    )
      .then(() => {
        this._entityLoaderByID.delete(id);
        this._clearQueryCaches();
        this._emitChanges();
      })
      .catch((error: Error): void => this._updateCacheForError(id, error));
  }

  count(queryOptions?: QueryOptions): LoadObject<number> {
    const cacheKey = this._getCacheKey(queryOptions);
    if (!this._countLoaderByQuery.has(cacheKey)) {
      this._countLoaderByQuery.set(cacheKey, LoadObject.loading());
      this._emitChanges();

      this.__resolve(
        this.__buildHandler({
          ...queryOptions,
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
    if (!this._entityLoaderByID.has(id)) {
      this._entityLoaderByID.set(id, LoadObject.loading());
      this._emitChanges();
      this.__resolveSingle(
        this.__buildHandler().find(this.__reformatIDValue(id)),
      )
        .then((result: TEntity): void => this._updateCacheForEntity(result))
        .catch((error: Error): void => this._updateCacheForError(id, error));
    }

    return nullthrows(this._entityLoaderByID.get(id));
  }

  fetchByIDs(ids: Array<EntityID>): Map<string, LoadObject<TEntity>> {
    const idsToLoad = ids.filter(
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

          ids.forEach((id: string) => {
            const entity = entitiesByID.get(id);
            if (entity) {
              this._updateCacheForEntity(entity);
            } else {
              this._updateCacheForError(
                id,
                new Error(`Could not load ${this.getEntityName()} ${id}`),
              );
            }
          });

          this._emitChanges();
        })
        .catch((error: Error) => {
          ids.forEach((id: EntityID): void =>
            this._updateCacheForError(id, error, false),
          );

          this._emitChanges();
        });
    }

    return new Map(
      ids.map((id: EntityID): [string, LoadObject<TEntity>] => [
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
          this._entityIDsLoaderByQuery.set(cacheKey, LoadObject.withValue(ids));
          this._emitChanges();
          this.fetchByIDs(ids);
        })
        .catch((error: Error) => {
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
          nullthrows(resultMap.get(id)),
        );
      },
    );
  }

  flushCache() {
    this._entityLoaderByID = new Map();
    this._entityIDsLoaderByQuery = new Map();
    this._countLoaderByQuery = new Map();
    this._emitChanges();
  }

  patch(id: EntityID, mutator: TEntityMutator) {
    const entity = this._entityLoaderByID.get(id);
    if (entity) {
      this._entityLoaderByID.set(id, entity.updating());
      this._emitChanges();
    }

    this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(id)),
      this.getTranslator().toApi(mutator),
      'patch',
    )
      .then((result: TEntity) => {
        this._clearQueryCaches();
        this._updateCacheForEntity(result);
      })
      .catch((error: Error): void => this._updateCacheForError(id, error));
  }

  post(mutator: TEntityMutator) {
    this.__resolveSingle(
      this.__buildHandler(),
      this.getTranslator().toApi(mutator),
      'post',
    )
      .then(this._clearQueryCaches)
      .catch(this._emitChanges);
  }

  put(id: EntityID, mutator: TEntityMutator) {
    const entity = this._entityLoaderByID.get(id);
    if (entity) {
      this._entityLoaderByID.set(id, entity.updating());
      this._emitChanges();
    }

    this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(id)),
      this.getTranslator().toApi(mutator),
      'put',
    )
      .then((result: TEntity) => {
        this._clearQueryCaches();
        this._updateCacheForEntity(result);
      })
      .catch((error: Error): void => this._updateCacheForError(id, error));
  }

  subscribe(handler: () => void) {
    this._subscriptions.add(handler);
  }

  unsubscribe(handler: () => void) {
    this._subscriptions.delete(handler);
  }

  _emitChanges() {
    this._subscriptions.forEach((handler: () => void): void => handler());
  }

  _clearQueryCaches() {
    this._entityIDsLoaderByQuery = new Map();
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
    const loader = this._entityLoaderByID.get(id);
    this._entityLoaderByID.set(
      id,
      loader ? loader.setError(error) : LoadObject.withError(error),
    );
    if (shouldEmitChanges) {
      this._emitChanges();
    }
  }
}

export default DAO;
