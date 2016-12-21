'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants');

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

var _handler = require('../handler');

var _handler2 = _interopRequireDefault(_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DAO = function () {
  function DAO(config) {
    _classCallCheck(this, DAO);

    this._config = config;
  }

  _createClass(DAO, [{
    key: 'count',
    value: function count(queryOptions) {
      return this.__query(_constants.DAO_ACTIONS.COUNT, _extends({}, queryOptions, {
        count: true,
        take: 0
      }));
    }
  }, {
    key: 'deleteByID',
    value: function deleteByID(id) {
      var action = this.__query(_constants.DAO_ACTIONS.DELETE_BY_ID, {}, { id: id });
      action.method = 'delete';
      action.oHandler = action.oHandler.find(this.__reformatQueryValue(id));
      return action;
    }
  }, {
    key: 'getEntityName',
    value: function getEntityName() {
      return this._config.entityName;
    }
  }, {
    key: 'getTranslator',
    value: function getTranslator() {
      return this._config.translator;
    }
  }, {
    key: 'fetchByID',
    value: function fetchByID(id) {
      var action = this.__query(_constants.DAO_ACTIONS.FETCH_BY_ID, {}, { id: id });
      action.oHandler = action.oHandler.find(this.__reformatQueryValue(id));
      return action;
    }
  }, {
    key: 'fetchByIDs',
    value: function fetchByIDs(ids, meta) {
      var idsFilter = {
        operator: _constants.FILTER_OPERATORS.EQUALS,
        params: ['id'],
        values: ids
      };

      var queryOptions = {
        filters: [idsFilter]
      };

      return this.__query(_constants.DAO_ACTIONS.FETCH_BY_IDS, queryOptions, {}, meta);
    }
  }, {
    key: 'fetchMany',
    value: function fetchMany(queryOptions) {
      return this.__query(_constants.DAO_ACTIONS.FETCH_MANY, queryOptions);
    }
  }, {
    key: 'patch',
    value: function patch(id, params) {
      var action = this.__query(_constants.DAO_ACTIONS.PATCH, {}, this._config.translator.toApi(params));

      action.method = 'patch';
      action.oHandler = action.oHandler.find(this.__reformatQueryValue(id));
      return action;
    }
  }, {
    key: 'post',
    value: function post(params) {
      var action = this.__query(_constants.DAO_ACTIONS.POST, {}, this._config.translator.toApi(params));

      action.method = 'post';
      return action;
    }
  }, {
    key: 'put',
    value: function put(id, params) {
      var action = this.__query(_constants.DAO_ACTIONS.PUT, {}, this._config.translator.toApi(params));

      action.method = 'put';
      action.oHandler = action.oHandler.find(this.__reformatQueryValue(id));
      return action;
    }
  }, {
    key: '__reformatQueryValue',
    value: function __reformatQueryValue(value) {
      return isNaN(value) || value === '' ? '\'' + value + '\'' : value;
    }
  }, {
    key: '__query',
    value: function __query(requestStatus, queryOptions, params, meta) {
      return (0, _actions2.default)({
        method: 'get',
        oHandler: this._buildHandler(queryOptions)
      }, requestStatus, queryOptions, params, _extends({}, meta, {
        entityName: this._config.entityName,
        fromApi: this._config.translator.fromApi
      }));
    }
  }, {
    key: '_buildHandler',
    value: function _buildHandler(queryOptions) {
      var _this = this;

      var count = queryOptions.count,
          skip = queryOptions.skip,
          take = queryOptions.take;

      var handler = (0, _handler2.default)(this._config.entityName);

      if (this._config.navigationProperties) {
        var navigationPropString = Object.entries(this._config.navigationProperties).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          if (!value || !Array.isArray(value) || !value.length) {
            return key;
          }
          return key + '($select=' + value.join(',') + ')';
        }).join(',');

        handler = handler.expand(navigationPropString);
      }

      if (count) {
        handler = handler.inlineCount('true');
      }

      if (Number.isInteger(skip)) {
        handler = handler.skip(skip || 0);
      }

      if (Number.isInteger(take)) {
        handler = handler.top(take || 0);
      }

      if (queryOptions.filters) {
        var renderedFilters = queryOptions.filters.map(function (_ref3) {
          var operator = _ref3.operator,
              params = _ref3.params,
              values = _ref3.values;

          var isValidOperator = _constants.FILTER_FUNCTION_OPERATORS.find(function (op) {
            return op === operator;
          });

          var filters = values.map(function (value) {
            return params.map(function (param) {
              var reformattedValue = _this.__reformatQueryValue(value);

              if (isValidOperator) {
                return '(' + operator + '(' + param + ', ' + reformattedValue + '))';
              }

              return '(' + param + ' ' + operator + ' ' + reformattedValue + ')';
            });
          });

          return filters.reduce(function (previousFilter, currentFilters) {
            return [].concat(_toConsumableArray(previousFilter), _toConsumableArray(currentFilters));
          }).join(' or ');
        }).map(function (filter) {
          return '(' + filter + ')';
        }).join(' and ');

        handler.filter(renderedFilters);
      }

      if (queryOptions.orderBy) {
        var orderBy = queryOptions.orderBy[0].column;
        var direction = queryOptions.orderBy[0].direction;
        if (direction === 'desc') {
          handler.orderByDesc(orderBy);
        } else if (orderBy) {
          handler.orderBy(orderBy);
        }
      }

      return handler;
    }
  }]);

  return DAO;
}();

exports.default = DAO;