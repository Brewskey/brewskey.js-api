// @flow
import type { FilterCreators, FilterOperator, QueryFilter } from './index';
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

const getIn = (props: Array<string>, object: Object): any =>
  props.reduce(
    (previousObjectValue: any, prop: string): any =>
      previousObjectValue && previousObjectValue[prop]
        ? previousObjectValue[prop]
        : null,
    object,
  );

const makeFilter = (
  operator: FilterOperator,
  params: any,
): ((values: any) => QueryFilter) => (values: any): QueryFilter => ({
  operator,
  params: Array.isArray(params) ? params : [params],
  values: Array.isArray(values) ? values : [values],
});

export const createFilter = (params: any): FilterCreators =>
  Object.keys(FILTERS).reduce(
    (filters: FilterCreators, filter: string): FilterCreators => ({
      ...filters,
      [filter]: makeFilter(FILTERS[filter], params),
    }),
    {},
  );

// todo make unit tests
export const doesSatisfyQueryFilters = (
  item: Object,
  queryFilters: Array<QueryFilter>,
): boolean =>
  queryFilters.every((queryFilter: QueryFilter): boolean => {
    const { params, values, operator } = queryFilter;

    return params.some((param: string): boolean => {
      const itemValue = getIn(param.split('/'), item);

      return values.some((value: any): boolean => {
        switch (operator) {
          // todo add other cases
          case FILTER_OPERATORS.CONTAINS: {
            return itemValue.toString().includes(value.toString());
          }
          case FILTER_OPERATORS.EQUALS: {
            return value === itemValue;
          }
          case FILTER_OPERATORS.NOT_EQUALS: {
            return value !== itemValue;
          }
          default: {
            return false;
          }
        }
      });
    });
  });
