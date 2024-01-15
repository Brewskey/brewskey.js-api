"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PERMISSIONS_MAP = exports.FILTER_OPERATORS = exports.FILTER_FUNCTION_OPERATORS = exports.DAO_ENTITIES = void 0;
var PERMISSIONS_MAP = exports.PERMISSIONS_MAP = {
  Administrator: 4,
  BannedFromTap: 1,
  Edit: 3,
  Read: 2
};
var DAO_ENTITIES = exports.DAO_ENTITIES = {
  ACCOUNTS: 'accounts',
  ACHIEVEMENTS: 'achievements',
  BEVERAGE_AVAILABILITIES: 'beverage-availabilities',
  BEVERAGE_GLASSES: 'beverage-glasses',
  BEVERAGE_SRMS: 'beverage-srms',
  BEVERAGE_STYLES: 'beverage-styles',
  BEVERAGES: 'beverages',
  DEVICES: 'devices',
  FLOW_SENSORS: 'flow-sensors',
  FRIENDS: 'friends',
  KEGS: 'kegs',
  LOCATIONS: 'locations',
  ORGANIZATIONS: 'organizations',
  PERMISSIONS: 'permissions',
  POUR_CHART: 'chart',
  POURS: 'pours',
  PRICE_VARIANTS: 'price-variants',
  REPORTS: 'reports',
  SCHEDULE_GROUPS: 'schedule-groups',
  SCHEDULES: 'schedules',
  TAPS: 'taps'
};
var FILTER_OPERATORS = exports.FILTER_OPERATORS = {
  ANY: 'any',
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
  STARTS_WITH: 'startswith'
};
var FILTER_FUNCTION_OPERATORS = exports.FILTER_FUNCTION_OPERATORS = [FILTER_OPERATORS.CONTAINS, FILTER_OPERATORS.ENDS_WITH, FILTER_OPERATORS.NOT_ENDS_WITH, FILTER_OPERATORS.NOT_STARTS_WITH, FILTER_OPERATORS.STARTS_WITH];