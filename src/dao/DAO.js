// @flow
import type {
  DAOConfig,
  DAOTranslator,
  EntityName,
  QueryFilter,
  QueryOptions,
  RequestMethod,
} from '../index';

import oHandler from 'odata';
import DAOResult from './DAOResult';
import { FILTER_FUNCTION_OPERATORS } from '../constants';
import { createFilter } from '../filters';

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

class DAO<TEntity, TEntityMutator> {
  static _organizationID: ?string = null;
  _config: DAOConfig<TEntity, TEntityMutator>;

  constructor(config: DAOConfig<TEntity, TEntityMutator>) {
    this._config = config;
  }

  static setOrganizationID(organizationID: string) {
    DAO._organizationID = organizationID;
  }

  deleteByID(id: string): Promise<DAOResult<TEntity>> {
    return this._resolve(
      this._buildHandler().find(this.__reformatIDValue(id)),
      null,
      'delete',
    );
  }

  getEntityName(): EntityName {
    return this._config.entityName;
  }

  getTranslator(): DAOTranslator<TEntity, TEntityMutator> {
    return this._config.translator;
  }

  count(queryOptions: QueryOptions): Promise<DAOResult<TEntity>> {
    return this._resolve(
      this._buildHandler({
        ...queryOptions,
        count: true,
        take: 0,
      }),
    );
  }

  fetchByID(id: string): Promise<DAOResult<TEntity>> {
    return this._resolve(this._buildHandler().find(this.__reformatIDValue(id)));
  }

  fetchByIDs(ids: Array<string>): Promise<DAOResult<TEntity>> {
    return this._resolve(
      this._buildHandler({
        filters: [createFilter('id').equals(ids)],
      }),
    );
  }

  fetchMany(queryOptions?: QueryOptions): Promise<DAOResult<TEntity>> {
    return this._resolve(this._buildHandler(queryOptions));
  }

  patch(id: string, mutator: TEntityMutator): Promise<DAOResult<TEntity>> {
    return this._resolve(
      this._buildHandler().find(this.__reformatIDValue(id)),
      this._config.translator.toApi(mutator),
      'patch',
    );
  }

  post(mutator: TEntityMutator): Promise<DAOResult<TEntity>> {
    return this._resolve(
      this._buildHandler(),
      this._config.translator.toApi(mutator),
      'post',
    );
  }

  put(id: string, mutator: TEntityMutator): Promise<DAOResult<TEntity>> {
    return this._resolve(
      this._buildHandler().find(this.__reformatIDValue(id)),
      this._config.translator.toApi(mutator),
      'put',
    );
  }

  __reformatIDValue = (value: string): string | number =>
    isNaN(value) || value === '' ? `'${value}'` : value;

  __reformatQueryValue = (value: string | number): string | number =>
    typeof value === 'string' ? `'${encodeURIComponent(value)}'` : value;

  _buildHandler(queryOptions?: QueryOptions = {}): oHandler<TEntity> {
    const { count, skip, take } = queryOptions;
    let handler = oHandler(this._config.entityName);

    const navProps = this._config.navigationProperties;
    if (navProps) {
      const navPropsString = Array.from(Object.entries(navProps))
        .map(parseNavProp)
        .join(',');
      handler.expand(navPropsString);
    }

    if (count) {
      handler = handler.inlineCount('true');
    }

    if (Number.isInteger(skip)) {
      handler = handler.skip(skip || 0);
    }

    if (Number.isInteger(take)) {
      handler = handler.top(take || 0);
    }

    if (queryOptions.filters && queryOptions.filters.length > 0) {
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

      handler.filter(renderedFilters);
    }

    if (queryOptions.orderBy) {
      const orderBy = queryOptions.orderBy[0].column;
      const direction = queryOptions.orderBy[0].direction;
      if (direction === 'desc') {
        handler.orderByDesc(orderBy);
      } else if (orderBy) {
        handler.orderBy(orderBy);
      }
    }

    if (DAO._organizationID) {
      handler.customParam('organizationID', DAO._organizationID);
    }

    return handler;
  }

  async _resolve(
    handler: oHandler<TEntity>,
    params: ?Object,
    method: ?RequestMethod = 'get',
  ): Promise<DAOResult<TEntity>> {
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

    try {
      const resultHandler = await request;

      if (Array.isArray(resultHandler.data)) {
        resultHandler.data = (resultHandler.data || []).map(
          (item: Object): ?TEntity => this._config.translator.fromApi(item),
        );
      } else {
        resultHandler.data = this._config.translator.fromApi(
          resultHandler.data,
        );
      }

      return new DAOResult(resultHandler.data, resultHandler.inlinecount);
    } catch (error) {
      return new DAOResult(null, null, error);
    }
  }
}

export default DAO;
