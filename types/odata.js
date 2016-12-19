// @flow
import type { OHandler } from 'odata';

declare module 'brewskey.js-api' {
  declare type RequestStatus = {
    FAILURE: string,
    REQUEST: string,
    SUCCESS: string
  };

  declare type RequestMethod =
    'delete' |
    'get' |
    'patch' |
    'post' |
    'put';

  declare type FilterOperator =
    'contains' |
    'endswith' |
    'eq' |
    'gt' |
    'ge' |
    'lt' |
    'le' |
    'not endswith' |
    'ne' |
    'not startswith' |
    'startswith';

  declare type ConfigType<TModel> = {
    data?: Object,
    method: RequestMethod,
    oHandler: OHandler<TModel>,
  };

  declare type QueryFilter = {
    operator: FilterOperator,
    params: Array<string>,
    values: Array<string>
  };

  declare type QueryOrderBy = {
    column: string,
    direction: 'asc' | 'desc',
  };

  declare type QueryOptions = {
    count?: boolean,
    filters?: Array<QueryFilter>,
    orderBy?: Array<QueryOrderBy>,
    skip?: number,
    take?: number,
  };

  declare type ODataAction<TModel> = {
    meta?: Object,
    method: RequestMethod,
    oHandler: OHandler<TModel>,
    params?: Object,
    queryOptions: QueryOptions,
    type: string,
    types: RequestStatus,
  };

  declare type ResultSet<TModel> = OHandler<TModel> & {
    data: Array<TModel>,
    inlinecount?: number,
  };

  declare type RequestAction = {
    method: RequestMethod,
    type: string,
  };

  declare type SuccessAction<TModel> = {
    method: RequestMethod,
    params?: Object,
    queryOptions: QueryOptions,
    result: ResultSet<TModel>,
    type: string,
  };

  declare type FailureAction = {
    error: Error,
    method: RequestMethod,
    params?: Object,
    queryOptions: QueryOptions,
    type: string,
  };

  declare type ODataChartParams = {
    beginDate?: ?Date,
    endDate?: ?Date,
  };
}
