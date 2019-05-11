"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FILTER_FUNCTION_OPERATORS = exports.FILTER_OPERATORS = exports.DAO_ENTITIES = exports.PERMISSIONS_MAP = void 0;
var PERMISSIONS_MAP = {
  Administrator: 4,
  BannedFromTap: 1,
  Edit: 3,
  Read: 2
};
exports.PERMISSIONS_MAP = PERMISSIONS_MAP;
var DAO_ENTITIES = {
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
  ITEM_BEVERAGES: 'item-beverages',
  KEGS: 'kegs',
  LOCATIONS: 'locations',
  ORGANIZATIONS: 'organizations',
  PERMISSIONS: 'permissions',
  POUR_CHART: 'chart',
  POURS: 'pours',
  REPORTS: 'reports',
  SCHEDULE_GROUPS: 'schedule-groups',
  SCHEDULES: 'schedules',
  TAPS: 'taps'
};
exports.DAO_ENTITIES = DAO_ENTITIES;
var FILTER_OPERATORS = {
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
exports.FILTER_OPERATORS = FILTER_OPERATORS;
var FILTER_FUNCTION_OPERATORS = [FILTER_OPERATORS.CONTAINS, FILTER_OPERATORS.ENDS_WITH, FILTER_OPERATORS.NOT_ENDS_WITH, FILTER_OPERATORS.NOT_STARTS_WITH, FILTER_OPERATORS.STARTS_WITH];
exports.FILTER_FUNCTION_OPERATORS = FILTER_FUNCTION_OPERATORS;