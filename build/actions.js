'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

var createODataAction = function createODataAction(config, types, queryOptions, params, meta) {
  var oHandler = config.oHandler,
      method = config.method,
      data = config.data;

  var oDataAction = {
    meta: meta,
    method: method,
    oHandler: oHandler,
    params: params,
    queryOptions: queryOptions,
    type: _constants.ODATA_API,
    types: types
  };

  return method === 'get' ? oDataAction : _extends({}, oDataAction, { params: data });
};

exports.default = createODataAction;