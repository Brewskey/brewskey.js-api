"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doesSatisfyQueryFilters = exports.createFilter = void 0;

var _constants = require("./constants");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var getIn = function getIn(props, object) {
  return props.reduce(function (previousObjectValue, prop) {
    return previousObjectValue && previousObjectValue[prop] ? previousObjectValue[prop] : null;
  }, object);
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

var createFilter = function createFilter(params) {
  return Object.keys(FILTERS).reduce(function (filters, filter) {
    return _objectSpread({}, filters, _defineProperty({}, filter, makeFilter(FILTERS[filter], params)));
  }, {});
}; // todo make unit tests


exports.createFilter = createFilter;

var doesSatisfyQueryFilters = function doesSatisfyQueryFilters(item, queryFilters) {
  return queryFilters.every(function (queryFilter) {
    var params = queryFilter.params,
        values = queryFilter.values,
        operator = queryFilter.operator;
    return params.some(function (param) {
      var itemValue = getIn(param.split('/'), item);
      return values.some(function (value) {
        switch (operator) {
          // todo add other cases
          case _constants.FILTER_OPERATORS.CONTAINS:
            {
              return itemValue.toString().includes(value.toString());
            }

          case _constants.FILTER_OPERATORS.EQUALS:
            {
              return value === itemValue;
            }

          case _constants.FILTER_OPERATORS.NOT_EQUALS:
            {
              return value !== itemValue;
            }

          default:
            {
              return false;
            }
        }
      });
    });
  });
};

exports.doesSatisfyQueryFilters = doesSatisfyQueryFilters;