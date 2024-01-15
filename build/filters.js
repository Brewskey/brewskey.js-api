"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doesSatisfyQueryFilters = exports.createFilter = void 0;
var _constants = require("./constants");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FILTERS = {
  any: _constants.FILTER_OPERATORS.ANY,
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
var createFilter = exports.createFilter = function createFilter(params) {
  return Object.keys(FILTERS).reduce(function (filters, filter) {
    return _objectSpread(_objectSpread({}, filters), {}, _defineProperty({}, filter, makeFilter(FILTERS[filter], params)));
  }, {});
};

// todo make unit tests
var doesSatisfyQueryFilters = exports.doesSatisfyQueryFilters = function doesSatisfyQueryFilters(item, queryFilters) {
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