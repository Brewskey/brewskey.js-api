// @flow
import type {
  EntityName,
  DAOConfig,
  DAOResult,
  DAOTranslator,
  QueryFilter,
  ODataAction,
  ODataResult,
  RequestStatus,
  QueryOptions,
} from 'brewskey.js-api';

import {
  DAO_ACTIONS,
  FILTER_OPERATORS,
  FILTER_FUNCTION_OPERATORS,
} from '../constants';

import createODataAction from '../actions';

import oHandler from '../handler';

class DAO<TModel, TModelMutator> {
  _config: DAOConfig<TModel, TModelMutator>;

  constructor(config: DAOConfig<TModel, TModelMutator>) {
    this._config = config;
  }

  count(queryOptions: QueryOptions): Promise<DAOResult<TModel>> {
    return this._resolve(this.__query(
      DAO_ACTIONS.COUNT,
      {
        ...queryOptions,
        count: true,
        take: 0,
      },
    ));
  }

  deleteByID(id: string): Promise<DAOResult<TModel>> {
    const action = this.__query(DAO_ACTIONS.DELETE_BY_ID, {}, { id });
    action.method = 'delete';
    action.oHandler = action.oHandler.find(this.__reformatQueryValue(id));
    return this._resolve(action);
  }

  getEntityName(): EntityName {
    return this._config.entityName;
  }

  getTranslator(): DAOTranslator<TModel, TModelMutator> {
    return this._config.translator;
  }

  fetchByID(id: string): Promise<DAOResult<TModel>> {
    const action = this.__query(DAO_ACTIONS.FETCH_BY_ID, {}, { id });
    action.oHandler = action.oHandler.find(this.__reformatQueryValue(id));
    return this._resolve(action);
  }

  fetchByIDs(ids: Array<string>, meta?: Object): Promise<DAOResult<TModel>> {
    const idsFilter = {
      operator: FILTER_OPERATORS.EQUALS,
      params: ['id'],
      values: ids,
    };

    const queryOptions = {
      filters: [idsFilter],
    };

    return this._resolve(this.__query(
      DAO_ACTIONS.FETCH_BY_IDS,
      queryOptions,
      {},
      meta,
    ));
  }

  fetchMany(queryOptions: QueryOptions): Promise<DAOResult<TModel>> {
    return this._resolve(this.__query(
      DAO_ACTIONS.FETCH_MANY,
      queryOptions,
    ));
  }

  patch(id: string, params: TModelMutator): Promise<DAOResult<TModel>> {
    const action = this.__query(
      DAO_ACTIONS.PATCH,
      {},
      this._config.translator.toApi(params),
    );

    action.method = 'patch';
    action.oHandler = action.oHandler.find(this.__reformatQueryValue(id));
    return this._resolve(action);
  }

  post(params: TModelMutator): Promise<DAOResult<TModel>> {
    const action = this.__query(
      DAO_ACTIONS.POST,
      {},
      this._config.translator.toApi(params),
    );

    action.method = 'post';
    return this._resolve(action);
  }

  put(id: string, params: TModelMutator): Promise<DAOResult<TModel>> {
    const action = this.__query(
      DAO_ACTIONS.PUT,
      {},
      this._config.translator.toApi(params),
    );

    action.method = 'put';
    action.oHandler = action.oHandler.find(this.__reformatQueryValue(id));
    return this._resolve(action);
  }

  __reformatQueryValue(value: string | number): string | number {
    return isNaN(value) || value === '' ? `'${value}'` : value;
  }

  __query(
    requestStatus: RequestStatus,
    queryOptions: QueryOptions,
    params?: Object,
    meta?: Object,
  ): ODataAction<TModel> {
    return createODataAction(
      {
        method: 'get',
        oHandler: this._buildHandler(queryOptions),
      },
      requestStatus,
      queryOptions,
      params,
      {
        ...meta,
        entityName: this._config.entityName,
        fromApi: this._config.translator.fromApi,
      }
    );
  }

  _buildHandler(queryOptions: QueryOptions): oHandler<TModel> {
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
  }

  async _resolve(action: ODataAction<TModel>): Promise<DAOResult<TModel>> {
    let request: Promise<ODataResult<TModel>>;
    switch (action.method) {
      case 'delete':
        request = action.oHandler.remove().save();
        break;
      case 'patch':
        request = action.oHandler.patch(action.params).save();
        break;
      case 'post':
        request = action.oHandler.post(action.params).save();
        break;
      case 'put':
        request = action.oHandler.put(action.params).save();
        break;
      default:
        request = action.oHandler.get();
    }

    const result = await request;

    return {
      action,
      data: action.meta && (Array.isArray(result.data)
        ? result.data.map(action.meta.fromApi)
        : action.meta.fromApi(result.data)),
      handler: result,
    };
  }
}

export default DAO;
