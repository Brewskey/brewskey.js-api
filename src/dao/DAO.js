// @flow
import type { QueryOptions } from '../index';

import nanoid from 'nanoid';
import nullthrows from 'nullthrows';
import BaseDAO from './BaseDAO';
import LoadObject from '../LoadObject';

class DAO<TEntity: { id: string }, TEntityMutator> extends BaseDAO<
  TEntity,
  TEntityMutator,
> {
  _countLoaderByQuery: Map<string, LoadObject<number>> = new Map();
  _entityIDsLoaderByQuery: Map<string, LoadObject<Array<string>>> = new Map();
  _entityLoaderByID: Map<string, LoadObject<TEntity>> = new Map();
  _subscriptionsByID: Map<string, () => void> = new Map();

  deleteByID(id: string) {
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
          count: true,
          take: 0,
        }),
      )
        .then((result: Object) => {
          // TODO - test this... it should be a number in the object
          this._countLoaderByQuery.set(
            cacheKey,
            LoadObject.withValue(result.data),
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

  fetchByID(id: string): LoadObject<TEntity> {
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

  fetchByIDs(ids: Array<string>): Map<string, LoadObject<TEntity>> {
    const idsToLoad = ids.filter(
      (id: string): boolean => !this._entityLoaderByID.has(id),
    );

    if (idsToLoad.length) {
      idsToLoad.forEach((id: string) => {
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
            results.map((item: TEntity): [string, TEntity] => [item.id, item]),
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
          ids.forEach((id: string): void =>
            this._updateCacheForError(id, error, false),
          );

          this._emitChanges();
        });
    }

    return new Map(
      ids.map((id: string): [string, LoadObject<TEntity>] => [
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
        .then((ids: Array<string>) => {
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
      (ids: Array<string>): Array<LoadObject<TEntity>> => {
        const resultMap = this.fetchByIDs(ids);
        return ids.map((id: string): LoadObject<TEntity> =>
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

  patch(id: string, mutator: TEntityMutator) {
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

  put(id: string, mutator: TEntityMutator) {
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

  subscribe(handler: () => void): string {
    const subscriptionID = nanoid();
    this._subscriptionsByID.set(subscriptionID, handler);
    return subscriptionID;
  }

  unsubscribe(subscriptionID: string) {
    this._subscriptionsByID.delete(subscriptionID);
  }

  _emitChanges() {
    this._subscriptionsByID.forEach((handler: () => void): void => handler());
  }

  _clearQueryCaches() {
    this._entityIDsLoaderByQuery = new Map();
  }

  _getCacheKey(queryOptions?: QueryOptions): string {
    return JSON.stringify(queryOptions || '_');
  }

  _updateCacheForEntity(entity: TEntity, shouldEmitChanges: boolean = true) {
    this._entityLoaderByID.set(
      entity.id.toString(),
      LoadObject.withValue(entity),
    );
    if (shouldEmitChanges) {
      this._emitChanges();
    }
  }

  _updateCacheForError(
    id: string,
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
