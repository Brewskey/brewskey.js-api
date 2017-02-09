// @flow
import type {
  FilterCreators,
  FilterOperator,
  QueryFilter,
} from 'brewskey.js-api';
import { FILTER_OPERATORS } from './constants';

const FILTERS: { [string]: FilterOperator } = {
  contains: FILTER_OPERATORS.CONTAINS,
  endsWith: FILTER_OPERATORS.ENDS_WITH,
  equals: FILTER_OPERATORS.EQUALS,
  greaterThan: FILTER_OPERATORS.GREATER_THAN,
  greaterThanOrEqual: FILTER_OPERATORS.GREATER_THAN_OR_EQUAL,
  lessThan: FILTER_OPERATORS.LESS_THAN,
  lessThanOrEqual: FILTER_OPERATORS.LESS_THAN_OR_EQUAL,
  notEndsWith: FILTER_OPERATORS.NOT_ENDS_WITH,
  notEquals: FILTER_OPERATORS.NOT_EQUALS,
  notStartsWith: FILTER_OPERATORS.NOT_STARTS_WITH,
  startsWith: FILTER_OPERATORS.STARTS_WITH,
};

const makeFilter = (
  operator: FilterOperator,
  params: any,
): (values: any) => QueryFilter =>
  (values: any): QueryFilter => ({
    operator,
    params: Array.isArray(params) ? params : [params],
    values: Array.isArray(values) ? values : [values],
  });

export default (params: any): FilterCreators => Object.keys(FILTERS).reduce(
  (filters: FilterCreators, filter: string): FilterCreators =>
    ({ ...filters, [filter]: makeFilter(FILTERS[filter], params) }),
  {},
);
