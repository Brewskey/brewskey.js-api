'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = require('../handler');

var _handler2 = _interopRequireDefault(_handler);

var _DAOResult = require('./DAOResult');

var _DAOResult2 = _interopRequireDefault(_DAOResult);

var _constants = require('../constants');

var _filters = require('../filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DAO = function () {
  function DAO(config) {
    var _this = this;

    _classCallCheck(this, DAO);

    this.deleteByID = function (id) {
      return _this._resolve(_this._buildHandler().find(_this.__reformatQueryValue(id)), null, 'delete');
    };

    this.getEntityName = function () {
      return _this._config.entityName;
    };

    this.getTranslator = function () {
      return _this._config.translator;
    };

    this.count = function (queryOptions) {
      return _this._resolve(_this._buildHandler(_extends({}, queryOptions, {
        count: true,
        take: 0
      })));
    };

    this.fetchByID = function (id) {
      return _this._resolve(_this._buildHandler().find(_this.__reformatQueryValue(id)));
    };

    this.fetchByIDs = function (ids) {
      return _this._resolve(_this._buildHandler({
        filters: [(0, _filters2.default)('id').equals(ids)]
      }));
    };

    this.fetchMany = function (queryOptions) {
      return _this._resolve(_this._buildHandler(queryOptions));
    };

    this.patch = function (id, mutator) {
      return _this._resolve(_this._buildHandler().find(_this.__reformatQueryValue(id)), _this._config.translator.toApi(mutator), 'patch');
    };

    this.post = function (mutator) {
      return _this._resolve(_this._buildHandler(), _this._config.translator.toApi(mutator), 'post');
    };

    this.put = function (id, mutator) {
      return _this._resolve(_this._buildHandler().find(_this.__reformatQueryValue(id)), _this._config.translator.toApi(mutator), 'put');
    };

    this.__reformatQueryValue = function (value) {
      return isNaN(value) || value === '' ? '\'' + value + '\'' : value;
    };

    this._buildHandler = function () {
      var queryOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var count = queryOptions.count,
          skip = queryOptions.skip,
          take = queryOptions.take;

      var handler = (0, _handler2.default)(_this._config.entityName);

      if (_this._config.navigationProperties) {
        var navigationPropString = Object.entries(_this._config.navigationProperties).map(function (_ref) {
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
    };

    this._config = config;
  }

  // TODO oHandler<TModel> throws Flow error, it was okey in old code,
  // figure it out


  _createClass(DAO, [{
    key: '_resolve',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(handler, params) {
        var _this2 = this;

        var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
        var request, resultHandler;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = void 0;
                _context.t0 = method;
                _context.next = _context.t0 === 'delete' ? 4 : _context.t0 === 'patch' ? 6 : _context.t0 === 'post' ? 8 : _context.t0 === 'put' ? 10 : 12;
                break;

              case 4:
                request = handler.remove().save();
                return _context.abrupt('break', 13);

              case 6:
                request = handler.patch(params).save();
                return _context.abrupt('break', 13);

              case 8:
                request = handler.post(params).save();
                return _context.abrupt('break', 13);

              case 10:
                request = handler.put(params).save();
                return _context.abrupt('break', 13);

              case 12:
                request = handler.get();

              case 13:
                _context.prev = 13;
                _context.next = 16;
                return request;

              case 16:
                resultHandler = _context.sent;


                if (Array.isArray(resultHandler.data)) {
                  resultHandler.data = (resultHandler.data || []).map(function (item) {
                    return _this2._config.translator.fromApi(item);
                  });
                } else {
                  resultHandler.data = this._config.translator.fromApi(resultHandler.data);
                }

                return _context.abrupt('return', new _DAOResult2.default(resultHandler.data, resultHandler.inlinecount));

              case 21:
                _context.prev = 21;
                _context.t1 = _context['catch'](13);
                return _context.abrupt('return', new _DAOResult2.default(null, null, _context.t1));

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[13, 21]]);
      }));

      function _resolve(_x2, _x3) {
        return _ref4.apply(this, arguments);
      }

      return _resolve;
    }()
  }]);

  return DAO;
}();

exports.default = DAO;