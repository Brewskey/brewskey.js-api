import type { EntityID, EntityName } from '../index';

import Subscription from './Subscription';
import fetch, { FetchOptions } from '../fetch';

export type GetManyParams = {
  skip?: number;
  take?: number;
};

class RestDAO<TEntity, TEntityMutator> extends Subscription {
  _entityName: EntityName;

  constructor({ entityName }: { entityName: EntityName }) {
    super();
    this._entityName = entityName;
  }

  getEntityName(): EntityName {
    return this._entityName;
  }

  __count(path: string, queryParams?: FetchOptions): Promise<number> {
    return fetch(path, { method: 'GET', ...queryParams });
  }

  __getMany(path: string, queryParams?: FetchOptions): Promise<TEntity[]> {
    return fetch(path, { method: 'GET', ...queryParams });
  }

  __getOne(path: string, queryParams?: FetchOptions): Promise<TEntity> {
    return fetch(path, {
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'GET',
      ...queryParams,
    });
  }

  __fetchOne(path: string, queryParams?: FetchOptions): Promise<TEntity> {
    return fetch(path, { method: 'GET', ...queryParams });
  }

  __post(
    path: string,
    mutator: Record<string, unknown>,
    queryParams?: FetchOptions,
  ): Promise<TEntity> {
    return fetch(path, {
      body: JSON.stringify(mutator),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'POST',
      ...queryParams,
    });
  }

  __put(
    path: string,
    mutator: TEntityMutator,
    queryParams?: FetchOptions,
  ): Promise<TEntity> {
    return fetch<TEntity>(path, {
      body: JSON.stringify(mutator),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      ...queryParams,
      method: 'PUT',
    });
  }

  async __delete(path: string, queryParams?: FetchOptions): Promise<void> {
    await fetch(path, { method: 'DELETE', ...queryParams });
  }
}

export default RestDAO;
