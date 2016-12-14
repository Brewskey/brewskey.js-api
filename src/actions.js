// @flow
import type {
  ConfigType,
  FailureAction,
  QueryOptions,
  ODataAction,
  ResultSet,
  RequestAction,
  RequestStatus,
  SuccessAction,
} from './types/odata';

import { ODATA_API } from './constants';

const createODataAction = <TModel>(
  config: ConfigType<TModel>,
  types: RequestStatus,
  queryOptions: QueryOptions,
  params?: Object,
  meta?: Object,
): ODataAction<TModel> => {
  const { oHandler, method, data } = config;
  const oDataAction = {
    meta,
    method,
    oHandler,
    params,
    queryOptions,
    type: ODATA_API,
    types,
  };

  return method === 'get' ? oDataAction : { ...oDataAction, params: data };
};

const createRequestAction = <TModel>(
  { types, meta, method, params, queryOptions }: ODataAction<TModel>,
): RequestAction => ({
  meta,
  method,
  params,
  queryOptions,
  type: types.REQUEST,
});

const createSuccessAction = <TModel>(
  { types, meta, method, params, queryOptions }: ODataAction<TModel>,
  result: ResultSet<TModel>,
): SuccessAction<TModel> => ({
  meta,
  method,
  params,
  queryOptions,
  result,
  type: types.SUCCESS,
});

const createFailureAction = <TModel>(
  { types, meta, method, params, queryOptions }: ODataAction<TModel>,
  error: Error,
): FailureAction => ({
  error,
  meta,
  method,
  params,
  queryOptions,
  type: types.FAILURE,
});

export {
  createODataAction,
  createRequestAction,
  createSuccessAction,
  createFailureAction,
};
