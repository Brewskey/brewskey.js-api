// @flow

import type { EntityID } from '../index';

import nullthrows from 'nullthrows';
import ClientID from './ClientID';
import Subscription from './Subcription';
import LoadObject from '../LoadObject';
import fetch from '../fetch';

class RestDAO<TEntity: { id: EntityID }, TEntityMutator> extends Subscription {
  _countLoaderByQuery: Map<string, LoadObject<number>> = new Map();

  _entityLoaderById: Map<EntityID, LoadObject<?TEntity>> = new Map();

  _entityIdsLoaderByQuery: Map<string, LoadObject<Array<EntityID>>> = new Map();

  __count<TQueryParams: Object>(
    path: string,
    queryParams?: TQueryParams,
  ): LoadObject<number> {
    const cacheKey = this.__getCacheKey(path, queryParams);

    if (!this._countLoaderByQuery.has(cacheKey)) {
      this._countLoaderByQuery.set(cacheKey, LoadObject.loading());
      this.__emitChanges();

      fetch(path, { method: 'GET', ...queryParams })
        .then((countResult: ?number) => {
          this._countLoaderByQuery.set(
            cacheKey,
            LoadObject.withValue(nullthrows(countResult)),
          );
          this.__emitChanges();
        })
        .catch(error => {
          Subscription.__emitError(error);
          this._countLoaderByQuery.set(cacheKey, LoadObject.withError(error));
          this.__emitChanges();
        });
    }

    return nullthrows(this._countLoaderByQuery.get(cacheKey));
  }

  __getMany<TQueryParams: Object>(
    path: string,
    queryParams?: TQueryParams,
  ): LoadObject<Array<LoadObject<TEntity>>> {
    const cacheKey = this.__getCacheKey(path, queryParams);

    if (!this._entityIdsLoaderByQuery.has(cacheKey)) {
      this._entityIdsLoaderByQuery.set(cacheKey, LoadObject.loading());
      this.__emitChanges();

      fetch(path, { method: 'GET', ...queryParams })
        .then(items => {
          const ids = nullthrows(items).map(({ id }) => id);

          nullthrows(items).forEach(item =>
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
        .then(result => {
          this._entityLoaderById.set(
            stringifiedId,
            LoadObject.withValue(nullthrows(result)),
          );
          this.__emitChanges();
        })
        .catch(error => {
          Subscription.__emitError(error);
          this._entityLoaderById.set(
            stringifiedId,
            LoadObject.withError(error),
          );
          this.__emitChanges();
        });
    }

    return nullthrows(this._entityLoaderById.get(stringifiedId));
  }

  __fetchOne<TQueryParams: Object>(
    path: string,
    queryParams?: TQueryParams,
  ): string {
    const clientId = ClientID.getClientId();

    this._entityLoaderById.set(clientId, LoadObject.loading());
    this.__emitChanges();

    fetch(path, { method: 'GET', ...queryParams })
      .then(result => {
        this._entityLoaderById.set(
          clientId,
          LoadObject.withValue(nullthrows(result)),
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
        this._entityLoaderById.set(
          nullthrows(item).id,
          LoadObject.withValue(nullthrows(item)),
        );
        this._entityLoaderById.set(
          clientId,
          nullthrows(this._entityLoaderById.get(nullthrows(item).id)),
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
      method: 'PUT',
    })
      .then(item => {
        this._flushQueryCaches();

        this._entityLoaderById.set(
          nullthrows(item).id,
          LoadObject.withValue(nullthrows(item)),
        );

        this._entityLoaderById.set(
          clientId,
          nullthrows(this._entityLoaderById.get(nullthrows(item).id)),
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
        this._entityLoaderById.set(clientId, LoadObject.empty());
        this.__emitChanges();

        this._entityLoaderById.delete(id);
        this._entityLoaderById.delete(clientId);
        this._flushQueryCaches();
        this.__emitChanges();
      })
      .catch(error => {
        Subscription.__emitError(error);
        this._entityLoaderById.set(clientId, LoadObject.withError(error));
        this.__emitChanges();
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

  waitForLoaded<TResponse>(
    fn: () => LoadObject<?TResponse>,
    timeout?: number = 10000,
  ): Promise<?TResponse> {
    return new Promise(
      (
        resolve: (response: TResponse) => void,
        reject: (error: Error) => void,
      ) => {
        setTimeout((): void => reject(new Error('Timeout!')), timeout);

        const fetchAndResolve = () => {
          let loader = fn();
          if (loader.hasOperation()) {
            return;
          }

          loader = loader.map(
            (result: $FlowFixMe): $FlowFixMe => {
              if (!Array.isArray(result)) {
                return result;
              }

              if (
                result.some(
                  (item: $FlowFixMe): boolean =>
                    item instanceof LoadObject ? item.hasOperation() : false,
                )
              ) {
                return LoadObject.loading();
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

  _flushQueryCaches() {
    this._entityIdsLoaderByQuery = new Map();
  }

  __getCacheKey(path: string, queryParams?: Object): string {
    return path + JSON.stringify(queryParams || '_');
  }
}

export default RestDAO;
