// @flow
import type {
  DAOConfig,
  DAOTranslator,
  EntityID,
  EntityName,
  QueryFilter,
  QueryOptions,
  RequestMethod,
  SelectExpandQuery,
} from '../index';

import nullthrows from 'nullthrows';
import oHandler from 'odata';
import BaseDAO from './BaseDAO';
import LoadObject from '../load_object/LoadObject';
import { FILTER_FUNCTION_OPERATORS } from '../constants';
import { createFilter } from '../filters';

const ID_REG_EXP = /\bid\b/;

class DAO<TEntity: { id: EntityID }, TEntityMutator> extends BaseDAO<
  TEntity,
  TEntityMutator,
> {
  _entityLoaderByID: Map<EntityID, LoadObject<TEntity>> = new Map();
  _entityIDsLoaderByQuery: Map<string, LoadObject<Array<EntityID>>> = new Map();
  _countLoaderByQuery: Map<string, LoadObject<number>> = new Map();
  _subscribers: Array<() => void> = [];

  constructor(config: DAOConfig<TEntity, TEntityMutator>) {
    super(config);
  }

  deleteByID(id: string): void {
    const entity = this._entityLoaderByID.get(id);
    if (!entity) {
      return;
    }

    this._entityLoaderByID.set(id, entity.deleting());
    this._emitChanges();

    this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(id)),
      null,
      'delete',
    )
      .then(() => {
        this._entityLoaderByID.delete(id);
        this._clearQueryCaches();
        this._emitChanges();
      })
      .catch(error => this._updateCacheForError(id, error));
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
        .then(result => {
          // TODO - test this... it should be a number in the object
          const loader = this._countLoaderByQuery.get(cacheKey);
          this._countLoaderByQuery.set(
            cacheKey,
            loader
              ? loader.setValue(result.data)
              : LoadObject.withValue(result.data),
          );
          this._emitChanges();
        })
        .catch(error => {
          const loader = this._countLoaderByQuery.get(cacheKey);
          this._countLoaderByQuery.set(
            cacheKey,
            loader ? loader.setValue(error) : LoadObject.withValue(error),
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
        .then(result => this._updateCacheForEntity(result))
        .catch(error => this._updateCacheForError(id, error));
    }

    return nullthrows(this._entityLoaderByID.get(id));
  }

  fetchByIDs(ids: Array<EntityID>): Array<LoadObject<TEntity>> {
    const idsToLoad = ids.filter(id => !this._entityLoaderByID.has(id));

    if (idsToLoad.length) {
      idsToLoad.forEach(id =>
        this._entityLoaderByID.set(id, LoadObject.loading()),
      );

      const queryOptions = {
        filters: [createFilter('id').equals(idsToLoad)],
      };
      this.__resolveMany(this.__buildHandler(queryOptions))
        .then(results => {
          results.forEach(entity => this._updateCacheForEntity(entity, false));
          this._emitChanges();
        })
        .catch(error => {
          ids.forEach(id => this._updateCacheForError(id, error, false));
          this._emitChanges();
        });
    }

    return ids.map(id => nullthrows(this._entityLoaderByID.get(id)));
  }

  fetchMany(
    queryOptions?: QueryOptions,
  ): LoadObject<Array<LoadObject<TEntity>>> {
    const cacheKey = this._getCacheKey(queryOptions);
    if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
      this._entityIDsLoaderByQuery.set(cacheKey, LoadObject.loading());
      this._emitChanges();

      let handler = oHandler(this.getEntityName());
      handler = this.__setFilters(handler, queryOptions);
      handler = handler.select('id');
      this.__resolveMany(queryOptions)
        .then(results => {
          const ids = results.map(result => result.id);
          this._entityIDsLoaderByQuery.set(cacheKey, LoadObject.withValue(ids));
          this._emitChanges();

          return this.fetchByIDs(ids);
        })
        .catch(error => {
          this._entityIDsLoaderByQuery.set(
            cacheKey,
            LoadObject.withError(error),
          );
          this._emitChanges();
        });
    }

    return nullthrows(this._entityIDsLoaderByQuery.get(cacheKey)).map(result =>
      this.fetchByIDs(result),
    );
  }

  patch(id: string, mutator: TEntityMutator): void {
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
      .then(result => {
        this._clearQueryCaches();
        this._updateCacheForEntity(result);
      })
      .catch(error => this._updateCacheForError(id, error));
  }

  post(mutator: TEntityMutator): void {
    this.__resolveSingle(
      this.__buildHandler(),
      this.getTranslator().toApi(mutator),
      'post',
    )
      .then(result => {
        this._clearQueryCaches();
        this._updateCacheForEntity(result);
      })
      .catch(() => this._emitChanges());
  }

  put(id: string, mutator: TEntityMutator): void {
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
      .then(result => {
        this._clearQueryCaches();
        this._updateCacheForEntity(result);
      })
      .catch(error => this._updateCacheForError(id, error));
  }

  subscribe(fn: () => void): void {
    if (this._subscribers.includes(fn)) {
      return;
    }
    this._subscribers.push(fn);
  }

  unsubscribe(fn: () => void): void {
    this._subscribers = this._subscribers.filter(item => item !== fn);
  }

  _emitChanges(): void {
    // TODO - stores should somehow subscribe to refetch when there are changes
  }

  _clearQueryCaches(): void {
    this._entityIDsLoaderByQuery = new Map();
    this._entityIDsLoaderByQuery = new Map();
  }

  _getCacheKey(queryOptions?: QueryOptions): string {
    return JSON.stringify(queryOptions || '_');
  }

  _updateCacheForEntity(
    entity: TEntity,
    should_emitChanges: boolean = true,
  ): void {
    const loader = this._entityLoaderByID.get(entity.id);
    this._entityLoaderByID.set(
      entity.id,
      loader ? loader.setValue(entity) : LoadObject.withValue(entity),
    );
    should_emitChanges && this._emitChanges();
  }

  _updateCacheForError(
    id: EntityID,
    error: Error,
    should_emitChanges: boolean = true,
  ): void {
    const loader = this._entityLoaderByID.get(id);
    this._entityLoaderByID.set(
      id,
      loader ? loader.setError(error) : LoadObject.withError(error),
    );
    should_emitChanges && this._emitChanges();
  }
}

export default DAO;
