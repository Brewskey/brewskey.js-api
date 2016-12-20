// @flow
import type {
  ConfigType,
  QueryOptions,
  ODataAction,
  RequestStatus,
} from 'brewskey.js-api';

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

export default createODataAction;
