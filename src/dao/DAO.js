// @flow
import type {
  DAOConfig,
  DAOTranslator,
  EntityName,
  ODataResult,
  QueryFilter,
  QueryOptions,
  RequestMethod,
} from 'brewskey.js-api';

import oHandler from '../handler';
import DAOResult from './DAOResult';
import { FILTER_FUNCTION_OPERATORS } from '../constants';
import apiFilter from '../filters';

class DAO<TModel, TModelMutator> {
  _config: DAOConfig<TModel, TModelMutator>;

  constructor(config: DAOConfig<TModel, TModelMutator>) {
    this._config = config;
  }

  deleteByID = (id: string): Promise<DAOResult<TModel>> =>
    this._resolve(
      this._buildHandler().find(this.__reformatQueryValue(id)),
      null,
      'delete',
    );

  getEntityName = (): EntityName =>
    this._config.entityName;

  getTranslator = (): DAOTranslator<TModel, TModelMutator> =>
    this._config.translator;

  count = (queryOptions: QueryOptions): Promise<DAOResult<TModel>> =>
    this._resolve(this._buildHandler({
      ...queryOptions,
      count: true,
      take: 0,
    }));

  fetchByID = (id: string): Promise<DAOResult<TModel>> =>
    this._resolve(
      this._buildHandler().find(this.__reformatQueryValue(id)),
    );

  fetchByIDs = (ids: Array<string>): Promise<DAOResult<TModel>> =>
    this._resolve(this._buildHandler({
      filters: [apiFilter('id').equals(ids)],
    }));

  fetchMany = (queryOptions?: QueryOptions): Promise<DAOResult<TModel>> =>
    this._resolve(this._buildHandler(queryOptions));

  patch = (id: string, mutator: TModelMutator): Promise<DAOResult<TModel>> =>
    this._resolve(
      this._buildHandler().find(this.__reformatQueryValue(id)),
      this._config.translator.toApi(mutator),
      'patch',
    );

  post = (mutator: TModelMutator): Promise<DAOResult<TModel>> =>
    this._resolve(
      this._buildHandler(),
      this._config.translator.toApi(mutator),
      'post',
    );

  put = (id: string, mutator: TModelMutator): Promise<DAOResult<TModel>> =>
    this._resolve(
      this._buildHandler().find(this.__reformatQueryValue(id)),
      this._config.translator.toApi(mutator),
      'put',
    );

  __reformatQueryValue = (value: string | number): string | number =>
    isNaN(value) || value === '' ? `'${value}'` : value;

  // TODO oHandler<TModel> throws Flow error, it was okey in old code,
  // figure it out
  _buildHandler = (queryOptions?: QueryOptions = {}): oHandler<$FlowFixMe> => {
    const { count, skip, take } = queryOptions;
    let handler = oHandler(this._config.entityName);

    if (this._config.navigationProperties) {
      const navigationPropString = Object.entries(
        this._config.navigationProperties,
      ).map(([key, value]: [string, mixed]): string => {
        if (!value || !Array.isArray(value) || !value.length) {
          return key;
        }
        return `${key}($select=${value.join(',')})`;
      }).join(',');

      handler = handler.expand(navigationPropString);
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

    if (queryOptions.filters) {
      const renderedFilters = queryOptions.filters.map(
        ({ operator, params, values }: QueryFilter): string => {
          const isValidOperator = FILTER_FUNCTION_OPERATORS.find(
            (op: string): boolean => op === operator,
          );

          const filters = values.map((value: string): Array<string> =>
            params.map((param: string): string => {
              const reformattedValue = this.__reformatQueryValue(value);

              if (isValidOperator) {
                return `(${operator}(${param}, ${reformattedValue}))`;
              }

              return `(${param} ${operator} ${reformattedValue})`;
            })
          );

          return filters.reduce((
            previousFilter: Array<string>,
            currentFilters: Array<string>,
          ): Array<string> => (
            [...previousFilter, ...currentFilters]
          )).join(' or ');
        }
      ).map((filter: string): string => (
        `(${filter})`
      )).join(' and ');

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

    return handler;
  };

  async _resolve(
    handler: oHandler<TModel>,
    params: ?Object,
    method: ?RequestMethod = 'get',
  ): Promise<DAOResult<TModel>> {
    let request: Promise<ODataResult<TModel>>;
    switch (method) {
      case 'delete':
        request = handler.remove().save();
        break;
      case 'patch':
        request = handler.patch(params).save();
        break;
      case 'post':
        request = handler.post(params).save();
        break;
      case 'put':
        request = handler.put(params).save();
        break;
      default:
        request = handler.get();
    }

    try {
      const resultHandler = await request;

      if (Array.isArray(resultHandler.data)) {
        resultHandler.data = (resultHandler.data || [])
          .map((item: Object): ?TModel =>
            this._config.translator.fromApi(item),
          );
      } else {
        resultHandler.data =
          this._config.translator.fromApi(resultHandler.data);
      }

      return new DAOResult(resultHandler.data, resultHandler.inlinecount);
    } catch (error) {
      return new DAOResult(null, null, error);
    }
  }
}

export default DAO;
