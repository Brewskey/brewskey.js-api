export type FilterOperator =
  | 'any'
  | 'contains'
  | 'endswith'
  | 'eq'
  | 'gt'
  | 'ge'
  | 'lt'
  | 'le'
  | 'not endswith'
  | 'ne'
  | 'not startswith'
  | 'startswith';

export type FilterCreator = (params?: unknown) => QueryFilter;

export type FilterCreators = {
  [key in keyof typeof FILTERS]: FilterCreator;
};

export type QueryFilter = {
  operator: FilterOperator;
  params: Array<string>;
  values: Array<string>;
};

import { FILTER_OPERATORS } from './constants';

const FILTERS = {
  any: FILTER_OPERATORS.ANY,
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
} as const;

const getIn = (
  props: Array<string>,
  object: Record<string, unknown>,
): unknown =>
  props.reduce((previousObjectValue: unknown, prop: string): unknown => {
    const isObject =
      typeof previousObjectValue === 'object' &&
      !Array.isArray(previousObjectValue) &&
      previousObjectValue != null;

    if (!isObject) {
      return null;
    }

    return (
      (previousObjectValue as unknown as Record<string, unknown>)[prop] ?? null
    );
  }, object);

const makeFilter =
  (
    operator: FilterOperator,
    params: string[] | string,
  ): ((values?: unknown[] | unknown) => QueryFilter) =>
  (values: unknown[] | unknown): QueryFilter => ({
    operator,
    params: Array.isArray(params) ? params : [params],
    values: Array.isArray(values) ? values : [values],
  });

export const createFilter = (params: string[] | string): FilterCreators =>
  (Object.keys(FILTERS) as unknown as (keyof typeof FILTERS)[]).reduce(
    (
      filters: FilterCreators,
      filter: keyof typeof FILTERS,
    ): FilterCreators => ({
      ...filters,
      [filter]: makeFilter(FILTERS[filter], params),
    }),
    {} as unknown as FilterCreators,
  );

// todo make unit tests
export const doesSatisfyQueryFilters = (
  item: Record<string, unknown>,
  queryFilters: Array<QueryFilter>,
): boolean =>
  queryFilters.every((queryFilter: QueryFilter): boolean => {
    const { params, values, operator } = queryFilter;

    return params.some((param: string): boolean => {
      const itemValue = getIn(param.split('/'), item);

      return values.some((value: unknown): boolean => {
        switch (operator) {
          // todo add other cases
          case FILTER_OPERATORS.CONTAINS: {
            return (
              value != null &&
              itemValue != null &&
              itemValue.toString().includes(value.toString())
            );
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
