// @flow
import type { FilterOperator } from './types';

const ODATA_API: string = 'ODATA_API';

const FILTER_OPERATORS: { [key: string]: FilterOperator } = {
  CONTAINS: 'contains',
  ENDS_WITH: 'endswith',
  EQUALS: 'eq',
  GREATER_THAN: 'gt',
  GREATER_THAN_OR_EQUAL: 'ge',
  LESS_THAN: 'lt',
  LESS_THAN_OR_EQUAL: 'le',
  NOT_ENDS_WITH: 'not endswith',
  NOT_EQUALS: 'ne',
  NOT_STARTS_WITH: 'not startswith',
  STARTS_WITH: 'startswith',
};

const FILTER_FUNCTION_OPERATORS = [
  FILTER_OPERATORS.CONTAINS,
  FILTER_OPERATORS.ENDS_WITH,
  FILTER_OPERATORS.NOT_ENDS_WITH,
  FILTER_OPERATORS.NOT_STARTS_WITH,
  FILTER_OPERATORS.STARTS_WITH,
];

const DAO_ACTIONS = {
  COUNT: {
    FAILURE: 'DAO_ACTIONS/COUNT_FAILURE',
    REQUEST: 'DAO_ACTIONS/COUNT_REQUEST',
    SUCCESS: 'DAO_ACTIONS/COUNT_SUCCESS',
  },
  DELETE_BY_ID: {
    FAILURE: 'DAO_ACTIONS/DELETE_BY_ID_FAILURE',
    REQUEST: 'DAO_ACTIONS/DELETE_BY_ID_REQUEST',
    SUCCESS: 'DAO_ACTIONS/DELETE_BY_ID_SUCCESS',
  },
  FETCH_BY_ID: {
    FAILURE: 'DAO_ACTIONS/FETCH_BY_ID_FAILURE',
    REQUEST: 'DAO_ACTIONS/FETCH_BY_ID_REQUEST',
    SUCCESS: 'DAO_ACTIONS/FETCH_BY_ID_SUCCESS',
  },
  FETCH_BY_IDS: {
    FAILURE: 'DAO_ACTIONS/FETCH_BY_IDS_FAILURE',
    REQUEST: 'DAO_ACTIONS/FETCH_BY_IDS_REQUEST',
    SUCCESS: 'DAO_ACTIONS/FETCH_BY_IDS_SUCCESS',
  },
  FETCH_CHART_DATA: {
    FAILURE: 'DAO_ACTIONS/FETCH_CHART_DATA_FAILURE',
    REQUEST: 'DAO_ACTIONS/FETCH_CHART_DATA_REQUEST',
    SUCCESS: 'DAO_ACTIONS/FETCH_CHART_DATA_SUCCESS',
  },
  FETCH_KEG_BY_TAP_ID: {
    FAILURE: 'DAO_ACTIONS/FETCH_KEG_BY_TAP_ID_FAILURE',
    REQUEST: 'DAO_ACTIONS/FETCH_KEG_BY_TAP_ID_REQUEST',
    SUCCESS: 'DAO_ACTIONS/FETCH_KEG_BY_TAP_ID_SUCCESS',
  },
  FETCH_MANY: {
    FAILURE: 'DAO_ACTIONS/FETCH_MANY_FAILURE',
    REQUEST: 'DAO_ACTIONS/FETCH_MANY_REQUEST',
    SUCCESS: 'DAO_ACTIONS/FETCH_MANY_SUCCESS',
  },
  PATCH: {
    FAILURE: 'DAO_ACTIONS/PATCH_FAILURE',
    REQUEST: 'DAO_ACTIONS/PATCH_REQUEST',
    SUCCESS: 'DAO_ACTIONS/PATCH_SUCCESS',
  },
  POST: {
    FAILURE: 'DAO_ACTIONS/POST_FAILURE',
    REQUEST: 'DAO_ACTIONS/POST_REQUEST',
    SUCCESS: 'DAO_ACTIONS/POST_SUCCESS',
  },
  PUT: {
    FAILURE: 'DAO_ACTIONS/PUT_FAILURE',
    REQUEST: 'DAO_ACTIONS/PUT_REQUEST',
    SUCCESS: 'DAO_ACTIONS/PUT_SUCCESS',
  },
};

export {
  ODATA_API,
  FILTER_OPERATORS,
  FILTER_FUNCTION_OPERATORS,
  DAO_ACTIONS,
};
