import type { OHandler } from 'odata';
import type {
  DAOTranslator,
  EntityID,
  EntityName,
  ODataDAOConfig,
  ODataDAOResult,
  ODataNavigationProperty,
  QueryOptions,
  RequestMethod,
} from '../types';
import type { QueryFilter } from '../filters';

import oHandler from 'odata';
import Subscription from './Subscription';
import { FILTER_FUNCTION_OPERATORS, FILTER_OPERATORS } from '../constants';
import Config from '../Config';

const ID_REG_EXP = /\bid\b/;

const parseNavProp = ([name, navProp]: [
  string,
  ODataNavigationProperty,
]): string => {
  const { expand, select } = navProp;
  const delimiter = select && expand ? ';' : '';
  const selectString = select ? `$select=${select.join(',')}` : '';

  const expandString = expand
    ? `${delimiter}$expand=${Array.from(Object.entries(expand))
        .map(parseNavProp)
        .join(',')}`
    : '';

  return `${name}(${selectString}${expandString})`;
};

class BaseODataDAO<
  TEntity,
  TEntityMutator,
  TFromApi = TEntity,
  TMutatorResult = TEntity,
> extends Subscription {
  __config: ODataDAOConfig<TEntity, TEntityMutator, TFromApi, TMutatorResult>;

  constructor(
    config: ODataDAOConfig<TEntity, TEntityMutator, TFromApi, TMutatorResult>,
  ) {
    super();
    this.__config = config;
  }

  getEntityName(): EntityName {
    return this.__config.entityName;
  }

  getTranslator(): DAOTranslator<
    TEntity,
    TEntityMutator,
    TFromApi,
    TMutatorResult
  > {
    return this.__config.translator;
  }

  // todo figure out if we can remove that completly
  protected __reformatIDValue = (value: string | number): string | number =>
    Number.isNaN(value) || value === '' ? `'${value}'` : value;

  protected __reformatQueryValue = (value: string | number): string | number =>
    typeof value === 'string' && !Date.parse(value)
      ? `'${encodeURIComponent(value)}'`
      : value;

  protected __buildHandler(
    queryOptions: QueryOptions = {},
    shouldSelectExpand: boolean = true,
  ): OHandler<TEntity> {
    const handler = oHandler(this.getEntityName());
    return this.__setupHandler(handler, queryOptions, shouldSelectExpand);
  }

  protected __setupHandler(
    handler: OHandler<TEntity>,
    queryOptions: QueryOptions = {},
    shouldExpand: boolean = true,
  ): OHandler<TEntity> {
    const { apply, shouldCount, search, skip, take } = queryOptions;

    const navProps = this.__config.navigationProperties;
    if (!search && shouldExpand && navProps) {
      const navPropsString = Array.from(Object.entries(navProps))
        .map(parseNavProp)
        .join(',');
      handler.expand(navPropsString);
    }

    if (Number.isInteger(skip)) {
      handler.skip(skip || 0);
    }

    if (Number.isInteger(take)) {
      handler.top(take || 0);
    }

    if (shouldCount) {
      handler.inlineCount('true');
    }

    this._setFilters(handler, queryOptions);

    if (queryOptions.orderBy) {
      const { column: orderBy, direction } = queryOptions.orderBy[0];

      if (direction === 'desc') {
        handler.orderByDesc(orderBy);
      } else if (orderBy) {
        handler.orderBy(orderBy);
      }
    }

    if (search) {
      handler.customParam('$search', search);
    }

    if (apply) {
      handler.customParam('$apply', apply);
    }

    if (Config.organizationId && !queryOptions.shouldIgnoreOrganizationID) {
      handler.customParam('organizationID', Config.organizationId.toString());
    }

    return handler;
  }

  protected _getCacheKey(queryOptions?: QueryOptions): string {
    return JSON.stringify(queryOptions || '_');
  }

  protected _setFilters(
    handler: OHandler<TEntity>,
    queryOptions: QueryOptions = {},
  ): OHandler<TEntity> {
    if (
      !queryOptions.filter &&
      (!queryOptions.filters || !queryOptions.filters.length)
    ) {
      return handler;
    }

    if (queryOptions.filters == null) {
      if (!queryOptions.filter) {
        return handler;
      }
      return handler.filter(queryOptions.filter);
    }

    let renderedFilters = queryOptions.filters
      .map((queryFilter: QueryFilter): string => {
        const { operator, params, values } = queryFilter;
        const isValidOperator = FILTER_FUNCTION_OPERATORS.find(
          (op: string): boolean => op === operator,
        );
        const isAnyOperator = operator === FILTER_OPERATORS.ANY;

        const filters = values.map(
          (value: string): Array<string> =>
            params.map((param: string): string => {
              // Any operator should have the value pre-formatted
              if (isAnyOperator) {
                return `(${param}/any(${value}))`;
              }

              // we have to use two reformat functions because of the issue:
              // https://github.com/Brewskey/brewskey.admin/issues/371
              // this is not ideal though, because it doesn't resolve
              // situations when we get stringified value from front-end
              // which is stored as number on the server.
              const reformattedValue = ID_REG_EXP.test(param)
                ? this.__reformatIDValue(value)
                : this.__reformatQueryValue(value);

              if (isValidOperator) {
                return `(${operator}(${param}, ${reformattedValue}))`;
              }

              return `(${param} ${operator} ${reformattedValue})`;
            }),
        );

        return filters
          .reduce(
            (
              previousFilter: Array<string>,
              currentFilters: Array<string>,
            ): Array<string> => [...previousFilter, ...currentFilters],
          )
          .join(' or ');
      })
      .map((filter: string): string => `(${filter})`)
      .join(' and ');

    if (queryOptions.filter != null) {
      renderedFilters = `${queryOptions.filter} and ${renderedFilters}`;
    }
    return handler.filter(renderedFilters);
  }

  protected __resolveSingle<TQueryOptions extends QueryOptions>(
    handler: OHandler<TEntity>,
    params?: TQueryOptions,
    method: RequestMethod = 'GET',
  ): Promise<TEntity> {
    return this.__resolve<TEntity, TQueryOptions>(handler, params, method).then(
      (result: ODataDAOResult<TEntity>): TEntity =>
        this.getTranslator().fromApi(result.data as unknown as TFromApi),
    );
  }

  protected async __resolveMany<TQueryOptions extends QueryOptions>(
    handler: OHandler<TEntity>,
    params?: TQueryOptions,
    method: RequestMethod = 'GET',
  ): Promise<Array<TEntity>> {
    const result = await this.__resolve<TEntity[], TQueryOptions>(
      handler,
      params,
      method,
    );
    return (result.data || []).map((item) =>
      this.getTranslator().fromApi(item as unknown as TFromApi),
    );
  }

  protected async __resolveManyIDs<TQueryOptions extends QueryOptions>(
    handler: OHandler<TEntity>,
    params?: TQueryOptions,
    method: RequestMethod = 'GET',
  ): Promise<Array<EntityID>> {
    const result = await this.__resolve<{ id: EntityID }[], TQueryOptions>(
      handler.select('id'),
      params,
      method,
    );
    return result.data.map(({ id }) => id);
  }

  protected async __resolve<TResult, TQueryOptions extends QueryOptions>(
    handler: OHandler<TEntity>,
    params: TQueryOptions | null = null,
    method: RequestMethod = 'GET',
  ): Promise<ODataDAOResult<TResult>> {
    let request: Promise<ODataDAOResult<TResult>>;
    switch (method) {
      case 'DELETE': {
        request = handler.remove().save();
        break;
      }
      case 'PATCH': {
        request = handler.patch(params).save();
        break;
      }
      case 'POST': {
        request = handler.post(params).save();
        break;
      }
      case 'PUT': {
        request = handler.put(params).save();
        break;
      }
      default: {
        request = handler.get();
      }
    }

    return request;
  }
}

export default BaseODataDAO;
