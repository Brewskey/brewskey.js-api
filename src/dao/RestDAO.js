// @flow

import nullthrows from 'nullthrows';
import Subscription from './Subcription';
import LoadObject from '../LoadObject';
import fetch from '../fetch';

class RestDAO<TEntity> extends Subscription {
  _entityLoaderByID: Map<EntityID, LoadObject<TEntity>> = new Map();
  _entityIDsLoaderByQuery: Map<string, LoadObject<Array<EntityID>>> = new Map();

  __delete() {}

  __fetchMany<TQueryParams>(
    path: string,
    queryParams?: TQueryParams,
  ): LoadObject<Array<LoadObject<TEntity>>> {
    const cacheKey = this.__getCacheKey(path, queryParams);

    if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
      this._entityIDsLoaderByQuery.set(cacheKey, LoadObject.loading());
      this.__emitChanges();

      fetch(path, { method: 'GET' })
        .then((items: Array<TEntity>) => {
          // todo items should be an array from api but now its null
          if (!items) {
            items = []; // eslint-disable-line
          }
          const ids = items.map(({ id }) => id);

          items.forEach(item =>
            this._entityLoaderByID.set(item.id, LoadObject.withValue(item)),
          );

          this._entityIDsLoaderByQuery.set(cacheKey, LoadObject.withValue(ids));
          this.__emitChanges();
        })
        .catch(error => {
          this._entityIDsLoaderByQuery.set(
            cacheKey,
            LoadObject.withError(error),
          );
          this.__emitChanges();
        });
    }

    return nullthrows(this._entityIDsLoaderByQuery.get(cacheKey)).map(ids =>
      ids.map(id => nullthrows(this._entityLoaderByID.get(id.toString()))),
    );
  }

  __fetchOne<TQueryParams>(
    path: string,
    id: EntityID,
    queryParams?: TQueryParams,
  ): LoadObject<?TEntity> {
    const stringifiedID = id.toString();

    if (!this._entityLoaderByID.has(stringifiedID)) {
      this._entityLoaderByID.set(stringifiedID, LoadObject.loading());
      this._emitChanges();

      fetch(path, { ...queryParams, method: 'GET' })
        .then(this._updateCacheForEntity)
        .catch(error => {
          this._updateCacheForError(stringifiedID, error);
        });
    }

    return nullthrows(this._entityLoaderByID.get(stringifiedID));
  }

  __post() {}

  __put() {}

  __getCacheKey(path: string, queryParams?: Object): string {
    return path + JSON.stringify(queryParams || '_');
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
    id: EntityID,
    error: Error,
    shouldEmitChanges: boolean = true,
  ) {
    this._entityLoaderByID.set(id.toString(), LoadObject.withError(error));
    if (shouldEmitChanges) {
      this._emitChanges();
    }
  }
}

export default RestDAO;
