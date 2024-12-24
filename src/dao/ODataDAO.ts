import type { OHandler } from 'odata';
import type {
  EntityID,
  ODataDAOResult,
  QueryOptions,
  RequestMethod,
} from '../index';

import BaseODataDAO from './BaseODataDAO';

class ODataDAO<
  TEntity extends {
    id: EntityID;
  },
  TEntityMutator,
  TFromApi = TEntity,
  TMutatorResult = TEntity,
> extends BaseODataDAO<TEntity, TEntityMutator, TFromApi, TMutatorResult> {
  static _clientID: number = 0;

  deleteByID(id: EntityID): Promise<TEntity> {
    const stringifiedID = id.toString();

    return this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      /* params */ {},
      'DELETE',
    );
  }

  count(queryOptions?: QueryOptions): Promise<number> {
    return this.__countCustom(
      (countQueryOptions: QueryOptions): OHandler<TEntity> =>
        this.__buildHandler({ ...countQueryOptions }),
      queryOptions,
    );
  }

  protected async __countCustom<TQueryOptions extends QueryOptions>(
    getOHandler: (baseQueryOptions: QueryOptions) => OHandler<TEntity>,
    queryOptions: QueryOptions = {},
  ): Promise<number> {
    const baseQueryOptions = this._getCountQueryOptions(queryOptions);

    const handler = getOHandler({
      ...baseQueryOptions,
      shouldCount: true,
      take: 0,
    });
    const result = await this.__resolve<number, TQueryOptions>(handler);
    return result.data;
  }

  fetchByID(id: EntityID): Promise<TEntity> {
    const stringifiedID = id.toString();
    return this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
    );
  }

  fetchByIDs(ids: Array<EntityID>): Promise<Array<TEntity>> {
    const stringifiedIds = ids.map(String);

    const handler = this.__buildHandler();
    handler.customParam('ids', stringifiedIds.join(','));

    return this.__resolveMany(handler);
  }

  fetchMany(queryOptions: QueryOptions = {}): Promise<TEntity[]> {
    const handler = this.__buildHandler(queryOptions, false);
    return this.__resolveMany(handler, queryOptions);
  }

  async fetchSingle(queryOptions?: QueryOptions): Promise<TEntity> {
    const combinedQueryOptions = {
      orderBy: [{ column: 'id', direction: 'desc' } as const],
      ...queryOptions,
      take: 1,
    };

    const result = await this.fetchMany(combinedQueryOptions);

    return result[0];
  }

  patch(id: EntityID, mutator: TEntityMutator): Promise<TEntity> {
    const stringifiedID = id.toString();

    return this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      this.getTranslator().toApi(mutator),
      'PATCH',
    );
  }

  post(mutator: TEntityMutator): Promise<TEntity> {
    return this.__resolveSingle(
      this.__buildHandler(),
      this.getTranslator().toApi(mutator),
      'POST',
    );
  }

  put(id: EntityID, mutator: TEntityMutator): Promise<TEntity> {
    const stringifiedID = id.toString();

    return this.__resolveSingle(
      this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      this.getTranslator().toApi(mutator),
      'PUT',
    );
  }

  protected __mutateCustom<TResult, TQueryOptions extends QueryOptions>(
    handler: OHandler<TEntity>,
    method: RequestMethod,
    mutator?: TQueryOptions,
  ): Promise<ODataDAOResult<TResult>> {
    return this.__resolve<TResult, TQueryOptions>(handler, mutator, method);
  }

  protected async __fetchCustom<TResult, TQueryOptions extends QueryOptions>(
    handler: OHandler<TEntity>,
    queryOptions?: TQueryOptions,
  ): Promise<TResult> {
    const result = await this.__resolve<TResult, TQueryOptions>(
      handler,
      queryOptions,
      'GET',
    );
    return result.data;
  }

  protected _getCountQueryOptions(
    queryOptions: QueryOptions = {},
  ): QueryOptions {
    const { orderBy, skip, take, ...countQueryOptions } = queryOptions;
    return countQueryOptions;
  }
}

export default ODataDAO;
