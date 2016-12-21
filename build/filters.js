'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FILTERS = {
  contains: _constants.FILTER_OPERATORS.CONTAINS,
  endsWith: _constants.FILTER_OPERATORS.ENDS_WITH,
  equals: _constants.FILTER_OPERATORS.EQUALS,
  greaterThan: _constants.FILTER_OPERATORS.GREATER_THAN,
  greaterThanOrEqual: _constants.FILTER_OPERATORS.GREATER_THAN_OR_EQUAL,
  lessThan: _constants.FILTER_OPERATORS.LESS_THAN,
  lessThanOrEqual: _constants.FILTER_OPERATORS.LESS_THAN_OR_EQUAL,
  notEndsWith: _constants.FILTER_OPERATORS.NOT_ENDS_WITH,
  notEquals: _constants.FILTER_OPERATORS.NOT_EQUALS,
  notStartsWith: _constants.FILTER_OPERATORS.NOT_STARTS_WITH,
  startsWith: _constants.FILTER_OPERATORS.STARTS_WITH
};

var makeFilter = function makeFilter(operator, params) {
  return function (values) {
    return {
      operator: operator,
      params: Array.isArray(params) ? params : [params],
      values: Array.isArray(values) ? values : [values]
    };
  };
};

exports.default = function (params) {
  return Object.keys(FILTERS).reduce(function (filters, filter) {
    return _extends({}, filters, _defineProperty({}, filter, makeFilter(FILTERS[filter], params)));
  }, {});
};