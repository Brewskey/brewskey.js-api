// @flow

import nullthrows from 'nullthrows';
import ClientID from './ClientID';
import Subscription from './Subcription';
import LoadObject from '../LoadObject';
import fetch from '../fetch';

class RestDAO<TEntity, TEntityMutator> extends Subscription {
  _entityLoaderByID: Map<EntityID, LoadObject<TEntity>> = new Map();
  _entityIDsLoaderByQuery: Map<string, LoadObject<Array<EntityID>>> = new Map();

  __delete<TQueryParams>(
    path: string,
    id: EntityID,
    queryParams?: TQueryParams,
  ) {
    const clientID = ClientID.getClientID();
    const stringifiedID = id.toString();

    const entity =
      this._entityLoaderByID.get(stringifiedID) || LoadObject.empty();
    this._entityLoaderByID.set(stringifiedID, entity.deleting());

    this._entityLoaderByID.set(clientID, LoadObject.empty().deleting());
    this.__emitChanges();

    fetch(path, { method: 'DELETE', ...queryParams })
      .then(() => {
        this._entityLoaderByID.delete(id);
        this._entityLoaderByID.delete(clientID);
        this._flushQueryCaches();
        this.__emitChanges();
      })
      .catch(error => {
        this._updateCacheForError(clientID, error);
      });

    return clientID;
  }

  __fetchMany<TQueryParams>(
    path: string,
    queryParams?: TQueryParams,
  ): LoadObject<Array<LoadObject<TEntity>>> {
    const cacheKey = this.__getCacheKey(path, queryParams);

    if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
      this._entityIDsLoaderByQuery.set(cacheKey, LoadObject.loading());
      this.__emitChanges();

      fetch(path, { method: 'GET', ...queryParams })
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
      this.__emitChanges();

      fetch(path, { method: 'GET', ...queryParams })
        .then(this._updateCacheForEntity)
        .catch(error => {
          this._updateCacheForError(stringifiedID, error);
        });
    }

    return nullthrows(this._entityLoaderByID.get(stringifiedID));
  }

  __post<TQueryParams>(
    path: string,
    mutator: any,
    queryParams?: TQueryParams,
  ): string {
    const clientID = ClientID.getClientID();
    this._entityLoaderByID.set(clientID, LoadObject.creating());

    fetch(path, {
      body: JSON.stringify(mutator),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'POST',
      ...queryParams,
    })
      .then(item => {
        this._flushQueryCaches();
        this._updateCacheForEntity(item, false);
        this._entityLoaderByID.set(
          clientID,
          nullthrows(this._entityLoaderByID.get(item.id)),
        );
        this.__emitChanges();
      })
      .catch(error => {
        this._entityLoaderByID.set(clientID, LoadObject.withError(error));
        this.__emitChanges();
      });

    return clientID;
  }

  __put<TQueryParams>(
    path: string,
    id: EntityID,
    mutator: TEntityMutator,
    queryParams?: TQueryParams,
  ) {
    const stringifiedID = id.toString();
    const entity =
      this._entityLoaderByID.get(stringifiedID) || LoadObject.empty();
    this._entityLoaderByID.set(stringifiedID, entity.updating());

    const clientID = ClientID.getClientID();
    this._entityLoaderByID.set(clientID, entity.updating());

    this.__emitChanges();

    fetch(path, {
      body: JSON.stringify(mutator),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      ...queryParams,
    })
      .then(item => {
        this._flushQueryCaches();
        this._updateCacheForEntity(item, false);
        // The clientID has a reference to the load object
        this._entityLoaderByID.set(
          clientID,
          nullthrows(this._entityLoaderByID.get(item.id)),
        );
        this.__emitChanges();
      })
      .catch(error => {
        this._updateCacheForError(clientID, error);
      });

    return clientID;
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

  flushQueryCaches() {
    this._flushQueryCaches();
    this.__emitChanges();
  }

  _flushQueryCaches() {
    this._entityIDsLoaderByQuery = new Map();
  }
  __getCacheKey(path: string, queryParams?: Object): string {
    return path + JSON.stringify(queryParams || '_');
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

export default RestDAO;
