// @flow
import type { OHandler } from 'odata';

export type EntityName =
  'accounts' |
  'beverage-availabilities' |
  'beverage-glasses' |
  'beverage-srms' |
  'beverage-styles' |
  'beverages' |
  'devices' |
  'kegs' |
  'locations' |
  'permissions' |
  'pours' |
  'schedule-groups' |
  'schedules' |
  'taps';

export type DAOTranslator<TModel, TModelMutator> = {
  +fromApi: (apiValue: Object) => TModel,
  +toApi: (model: TModelMutator) => Object,
  +toForm: (model: TModel) => TModelMutator,
};

export type DAOConfig<TModel, TModelMutator> = {
  entityName: EntityName,
  navigationProperties?: {[string]: ?Array<string>},
  translator: DAOTranslator<TModel, TModelMutator>,
};

export type RequestStatus = {
  FAILURE: string,
  REQUEST: string,
  SUCCESS: string
};

export type RequestMethods =
  'delete' |
  'get' |
  'patch' |
  'post' |
  'put';

export type RequestMethod =
  'delete' |
  'get' |
  'patch' |
  'post' |
  'put';

export type FilterOperator =
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

export type ConfigType<TModel> = {
  data?: Object,
  method: RequestMethod,
  oHandler: OHandler<TModel>,
};

export type QueryFilter = {
  operator: FilterOperator,
  params: Array<string>,
  values: Array<string>
};

export type QueryOrderBy = {
  column: string,
  direction: 'asc' | 'desc',
};

export type QueryOptions = {
  count?: boolean,
  filters?: Array<QueryFilter>,
  orderBy?: Array<QueryOrderBy>,
  skip?: number,
  take?: number,
};

export type ODataAction<TModel> = {
  meta?: Object,
  method: RequestMethod,
  oHandler: OHandler<TModel>,
  params?: Object,
  queryOptions: QueryOptions,
  type: string,
  types: RequestStatus,
};

export type ResultSet<TModel> = OHandler<TModel> & {
  data: Array<TModel>,
  inlinecount?: number,
};

export type RequestAction = {
  method: RequestMethod,
  type: string,
};

export type SuccessAction<TModel> = {
  method: RequestMethod,
  params?: Object,
  queryOptions: QueryOptions,
  result: ResultSet<TModel>,
  type: string,
};

export type FailureAction = {
  error: Error,
  method: RequestMethod,
  params?: Object,
  queryOptions: QueryOptions,
  type: string,
};
