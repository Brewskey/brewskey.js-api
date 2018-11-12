// @flow

import type { EntityID } from '../index';

import nullthrows from 'nullthrows';
import ClientID from './ClientID';
import Subscription from './Subcription';
import LoadObject from '../LoadObject';
import fetch from '../fetch';

class RestDAO<TEntity, TEntityMutator> extends Subscription {
  _entityLoaderById: Map<EntityID, LoadObject<?TEntity>> = new Map();

  _entityIdsLoaderByQuery: Map<string, LoadObject<Array<EntityID>>> = new Map();

  __getMany<TQueryParams: Object>(
    path: string,
    queryParams?: TQueryParams,
  ): LoadObject<Array<LoadObject<TEntity>>> {
    const cacheKey = this.__getCacheKey(path, queryParams);

    if (!this._entityIdsLoaderByQuery.has(cacheKey)) {
      this._entityIdsLoaderByQuery.set(cacheKey, LoadObject.loading());
      this.__emitChanges();

      fetch(path, { method: 'GET', ...queryParams })
        .then((items: ?Array<TEntity>) => {
          // todo items should be an array from api but now its null
          if (!items) {
            items = []; // eslint-disable-line
          }
          const ids = items.map(({ id }) => id);

          items.forEach(item =>
            this._entityLoaderById.set(item.id, LoadObject.withValue(item)),
          );

          this._entityIdsLoaderByQuery.set(cacheKey, LoadObject.withValue(ids));
          this.__emitChanges();
        })
        .catch(error => {
          Subscription.__emitError(error);
          this._entityIdsLoaderByQuery.set(
            cacheKey,
            LoadObject.withError(error),
          );
          this.__emitChanges();
        });
    }

    return nullthrows(this._entityIdsLoaderByQuery.get(cacheKey)).map(ids =>
      ids.map(id => nullthrows(this._entityLoaderById.get(id.toString()))),
    );
  }

  __getOne<TQueryParams: Object>(
    path: string,
    id: EntityID,
    queryParams?: TQueryParams,
  ): LoadObject<?TEntity> {
    const stringifiedId = id.toString();

    if (!this._entityLoaderById.has(stringifiedId)) {
      this._entityLoaderById.set(stringifiedId, LoadObject.loading());
      this.__emitChanges();

      fetch(path, {
        headers: [
          { name: 'Accept', value: 'application/json' },
          { name: 'Content-Type', value: 'application/json' },
        ],
        method: 'GET',
        ...queryParams,
      })
        .then(this._updateCacheForEntity)
        .catch(error => {
          Subscription.__emitError(error);
          this._updateCacheForError(stringifiedId, error);
        });
    }

    return nullthrows(this._entityLoaderById.get(stringifiedId));
  }

  __fetchOne<TQueryParams: Object>(
    path: string,
    queryParams?: TQueryParams,
  ): ClientID {
    const clientId = ClientID.getClientId();

    this._entityLoaderById.set(clientId, LoadObject.loading());
    this.__emitChanges();

    fetch(path, { method: 'GET', ...queryParams })
      .then(this._updateCacheForEntity)
      .catch(error => {
        Subscription.__emitError(error);
        this._updateCacheForError(clientId, error);
      });

    return nullthrows(this._entityLoaderById.get(clientId));
  }

  __post<TQueryParams: Object>(
    path: string,
    mutator: any,
    queryParams?: TQueryParams,
  ): string {
    const clientId = ClientID.getClientId();
    this._entityLoaderById.set(clientId, LoadObject.creating());

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
        this._entityLoaderById.set(
          clientId,
          nullthrows(this._entityLoaderById.get(item.id)),
        );
        this.__emitChanges();
      })
      .catch(error => {
        Subscription.__emitError(error);
        this._entityLoaderById.set(clientId, LoadObject.withError(error));
        this.__emitChanges();
      });

    return clientId;
  }

  __put<TQueryParams: Object>(
    path: string,
    id: EntityID,
    mutator: TEntityMutator,
    queryParams?: TQueryParams,
  ) {
    const stringifiedID = id.toString();
    const entity =
      this._entityLoaderById.get(stringifiedID) || LoadObject.empty();
    this._entityLoaderById.set(stringifiedID, entity.updating());

    const clientId = ClientID.getClientId();
    this._entityLoaderById.set(clientId, entity.updating());

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
        this._entityLoaderById.set(
          clientId,
          nullthrows(this._entityLoaderById.get(item.id)),
        );
        this.__emitChanges();
      })
      .catch(error => {
        Subscription.__emitError(error);
        this._updateCacheForError(clientId, error);
      });

    return clientId;
  }

  __delete<TQueryParams: Object>(
    path: string,
    id: EntityID,
    queryParams?: TQueryParams,
  ) {
    const clientId = ClientID.getClientId();
    const stringifiedId = id.toString();

    const entity =
      this._entityLoaderById.get(stringifiedId) || LoadObject.empty();
    this._entityLoaderById.set(stringifiedId, entity.deleting());

    this._entityLoaderById.set(clientId, LoadObject.empty().deleting());
    this.__emitChanges();

    fetch(path, { method: 'DELETE', ...queryParams })
      .then(() => {
        this._entityLoaderById.delete(id);
        this._entityLoaderById.delete(clientId);
        this._flushQueryCaches();
        this.__emitChanges();
      })
      .catch(error => {
        Subscription.__emitError(error);
        this._updateCacheForError(clientId, error);
      });

    return clientId;
  }

  flushCache() {
    this._entityLoaderById = new Map();
    this._flushQueryCaches();
    this.__emitChanges();
  }

  flushCacheForEntity(entityId: EntityID) {
    this._entityLoaderById.delete(entityId);
    this.__emitChanges();
  }

  flushQueryCaches() {
    this._flushQueryCaches();
    this.__emitChanges();
  }

  _flushQueryCaches() {
    this._entityIdsLoaderByQuery = new Map();
  }

  __getCacheKey(path: string, queryParams?: Object): string {
    return path + JSON.stringify(queryParams || '_');
  }

  _updateCacheForEntity(entity: TEntity, shouldEmitChanges: boolean = true) {
    this._entityLoaderById.set(
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
    this._entityLoaderById.set(id.toString(), LoadObject.withError(error));
    if (shouldEmitChanges) {
      this.__emitChanges();
    }
  }
}

export default RestDAO;
