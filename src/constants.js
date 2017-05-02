// @flow
import type {
  EntityName,
  FilterOperator,
} from './index';

export const DAO_ENTITIES: { [key: string]: EntityName } = {
  ACCOUNTS: 'accounts',
  BEVERAGE_AVAILABILITIES: 'beverage-availabilities',
  BEVERAGE_GLASSES: 'beverage-glasses',
  BEVERAGE_SRMS: 'beverage-srms',
  BEVERAGE_STYLES: 'beverage-styles',
  BEVERAGES: 'beverages',
  DEVICES: 'devices',
  KEGS: 'kegs',
  LOCATIONS: 'locations',
  PERMISSIONS: 'permissions',
  POUR_CHART: 'chart',
  POURS: 'pours',
  SCHEDULE_GROUPS: 'schedule-groups',
  SCHEDULES: 'schedules',
  TAPS: 'taps',
};

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

export {
  FILTER_OPERATORS,
  FILTER_FUNCTION_OPERATORS,
};
