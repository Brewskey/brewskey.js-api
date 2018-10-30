// @flow
import type {
  DAOConfig,
  DAOResult,
  DAOTranslator,
  EntityID,
  EntityName,
  QueryFilter,
  QueryOptions,
  RequestMethod,
} from '../index';

import oHandler from 'odata';
import { FILTER_FUNCTION_OPERATORS } from '../constants';

const ID_REG_EXP = /\bid\b/;

const parseNavProp = ([name, navProp]: [string, mixed]): string => {
  const { expand, select } = (navProp: any);
  const delimiter = select && expand ? ';' : '';
  const selectString = select ? `$select=${select.join(',')}` : '';

  const expandString = expand
    ? `${delimiter}$expand=${Array.from(Object.entries(expand))
        .map(parseNavProp)
        .join(',')}`
    : '';

  return `${name}(${selectString}${expandString})`;
};

type ErrorHandler = (error: Error) => void;

class BaseDAO<TEntity, TEntityMutator> {
  static _organizationID: ?EntityID = null;
  static _errorHandlers: Array<ErrorHandler> = [];

  static setOrganizationID(organizationID: ?EntityID) {
    BaseDAO._organizationID = organizationID;
  }

  static onError = (handler: ErrorHandler) => {
    BaseDAO._errorHandlers.push(handler);
  };

  static __handleError = (error: Error) => {
    BaseDAO._errorHandlers.forEach((handler: ErrorHandler): void =>
      handler(error),
    );
  };

  __config: DAOConfig<TEntity, TEntityMutator>;

  constructor(config: DAOConfig<TEntity, TEntityMutator>) {
    this.__config = config;
  }

  getEntityName(): EntityName {
    return this.__config.entityName;
  }

  getTranslator(): DAOTranslator<TEntity, TEntityMutator> {
    return this.__config.translator;
  }

  // todo figure out if we can remove that completly
  __reformatIDValue = (value: string): string | number =>
    isNaN(value) || value === '' ? `${value}` : value;

  __reformatQueryValue = (value: string | number): string | number =>
    typeof value === 'string' ? `'${encodeURIComponent(value)}'` : value;

  __buildHandler(
    queryOptions?: QueryOptions = {},
    shouldSelectExpand: boolean = true,
  ): oHandler<TEntity> {
    const handler = oHandler(this.getEntityName());
    return this.__setupHandler(handler, queryOptions, shouldSelectExpand);
  }

  __setupHandler(
    handler: oHandler<TEntity>,
    queryOptions?: QueryOptions = {},
    shouldExpand: boolean = true,
  ): oHandler<TEntity> {
    const { shouldCount, skip, take } = queryOptions;

    const navProps = this.__config.navigationProperties;
    if (shouldExpand && navProps) {
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
      const orderBy = queryOptions.orderBy[0].column;
      const direction = queryOptions.orderBy[0].direction;
      if (direction === 'desc') {
        handler.orderByDesc(orderBy);
      } else if (orderBy) {
        handler.orderBy(orderBy);
      }
    }

    const apply = queryOptions.apply;
    if (apply) {
      handler.customParam('$apply', apply);
    }

    if (BaseDAO._organizationID) {
      handler.customParam('organizationID', BaseDAO._organizationID);
    }

    return handler;
  }

  _getCacheKey(queryOptions?: QueryOptions): string {
    return JSON.stringify(queryOptions || '_');
  }

  _setFilters(
    handler: oHandler<TEntity>,
    queryOptions: QueryOptions = {},
  ): oHandler<TEntity> {
    if (!queryOptions.filters || !queryOptions.filters.length) {
      return handler;
    }
    const renderedFilters = queryOptions.filters
      .map(({ operator, params, values }: QueryFilter): string => {
        const isValidOperator = FILTER_FUNCTION_OPERATORS.find(
          (op: string): boolean => op === operator,
        );

        const filters = values.map((value: string): Array<string> =>
          params.map((param: string): string => {
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
    return handler.filter(renderedFilters);
  }

  __resolveSingle(
    handler: oHandler<TEntity>,
    params?: Object,
    method?: RequestMethod = 'get',
  ): Promise<TEntity> {
    return this.__resolve(handler, params, method).then(
      (result: DAOResult): TEntity => this.getTranslator().fromApi(result.data),
    );
  }

  async __resolveMany(
    handler: oHandler<TEntity>,
    params?: Object,
    method?: RequestMethod = 'get',
  ): Promise<Array<TEntity>> {
    const result = await this.__resolve(handler, params, method);
    return (result.data || []).map((item: Object): TEntity =>
      this.getTranslator().fromApi(item),
    );
  }

  async __resolveManyIDs(
    handler: oHandler<TEntity>,
    params?: Object,
    idSelector?: (item: Object) => EntityID = (item: Object): EntityID =>
      item.id,
    method?: RequestMethod = 'get',
  ): Promise<Array<EntityID>> {
    const result = await this.__resolve(handler, params, method);
    return (result.data || []).map(idSelector);
  }

  async __resolve(
    handler: oHandler<TEntity>,
    params?: Object,
    method?: RequestMethod = 'get',
  ): Promise<DAOResult> {
    let request: Promise<oHandler<TEntity>>;
    switch (method) {
      case 'delete': {
        request = handler.remove().save();
        break;
      }
      case 'patch': {
        request = handler.patch(params).save();
        break;
      }
      case 'post': {
        request = handler.post(params).save();
        break;
      }
      case 'put': {
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

export default BaseDAO;
