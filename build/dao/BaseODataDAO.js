"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _odata = _interopRequireDefault(require("odata"));

var _Subscription2 = _interopRequireDefault(require("./Subscription"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ID_REG_EXP = /\bid\b/;

var parseNavProp = function parseNavProp(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      navProp = _ref2[1];

  var _ref3 = navProp,
      expand = _ref3.expand,
      select = _ref3.select;
  var delimiter = select && expand ? ';' : '';
  var selectString = select ? "$select=".concat(select.join(',')) : '';
  var expandString = expand ? "".concat(delimiter, "$expand=").concat(Array.from(Object.entries(expand)).map(parseNavProp).join(',')) : '';
  return "".concat(name, "(").concat(selectString).concat(expandString, ")");
};

var BaseODataDAO =
/*#__PURE__*/
function (_Subscription) {
  _inherits(BaseODataDAO, _Subscription);

  _createClass(BaseODataDAO, null, [{
    key: "setOrganizationID",
    value: function setOrganizationID(organizationID) {
      BaseODataDAO._organizationID = organizationID;
    }
  }]);

  function BaseODataDAO(config) {
    var _this;

    _classCallCheck(this, BaseODataDAO);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseODataDAO).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "__config", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "__reformatIDValue", function (value // eslint-disable-next-line no-restricted-globals
    ) {
      return isNaN(value) || value === '' ? "'".concat(value, "'") : value;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "__reformatQueryValue", function (value) {
      return typeof value === 'string' ? "'".concat(encodeURIComponent(value), "'") : value;
    });

    _this.__config = config;
    return _this;
  }

  _createClass(BaseODataDAO, [{
    key: "getEntityName",
    value: function getEntityName() {
      return this.__config.entityName;
    }
  }, {
    key: "getTranslator",
    value: function getTranslator() {
      return this.__config.translator;
    } // todo figure out if we can remove that completly

  }, {
    key: "__buildHandler",
    value: function __buildHandler() {
      var queryOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var shouldSelectExpand = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var handler = (0, _odata.default)(this.getEntityName());
      return this.__setupHandler(handler, queryOptions, shouldSelectExpand);
    }
  }, {
    key: "__setupHandler",
    value: function __setupHandler(handler) {
      var queryOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var shouldExpand = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var shouldCount = queryOptions.shouldCount,
          skip = queryOptions.skip,
          take = queryOptions.take;
      var navProps = this.__config.navigationProperties;

      if (shouldExpand && navProps) {
        var navPropsString = Array.from(Object.entries(navProps)).map(parseNavProp).join(',');
        handler.expand(navPropsString);
      }

      if (Number.isInteger(skip)) {
        handler.skip(skip || 0);
      }

      if (Number.isInteger(take)) {
        handler.top(take || 0);
      }

      if (shouldCount) {
        handler.inlineCount('true');
      }

      this._setFilters(handler, queryOptions);

      if (queryOptions.orderBy) {
        var _queryOptions$orderBy = queryOptions.orderBy[0],
            orderBy = _queryOptions$orderBy.column,
            direction = _queryOptions$orderBy.direction;

        if (direction === 'desc') {
          handler.orderByDesc(orderBy);
        } else if (orderBy) {
          handler.orderBy(orderBy);
        }
      }

      var apply = queryOptions.apply;

      if (apply) {
        handler.customParam('$apply', apply);
      }

      if (BaseODataDAO._organizationID) {
        handler.customParam('organizationID', BaseODataDAO._organizationID.toString());
      }

      return handler;
    }
  }, {
    key: "_getCacheKey",
    value: function _getCacheKey(queryOptions) {
      return JSON.stringify(queryOptions || '_');
    }
  }, {
    key: "_setFilters",
    value: function _setFilters(handler) {
      var _this2 = this;

      var queryOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!queryOptions.filters || !queryOptions.filters.length) {
        return handler;
      }

      var renderedFilters = queryOptions.filters.map(function (_ref4) {
        var operator = _ref4.operator,
            params = _ref4.params,
            values = _ref4.values;

        var isValidOperator = _constants.FILTER_FUNCTION_OPERATORS.find(function (op) {
          return op === operator;
        });

        var filters = values.map(function (value) {
          return params.map(function (param) {
            // we have to use two reformat functions because of the issue:
            // https://github.com/Brewskey/brewskey.admin/issues/371
            // this is not ideal though, because it doesn't resolve
            // situations when we get stringified value from front-end
            // which is stored as number on the server.
            var reformattedValue = ID_REG_EXP.test(param) ? _this2.__reformatIDValue(value) : _this2.__reformatQueryValue(value);

            if (isValidOperator) {
              return "(".concat(operator, "(").concat(param, ", ").concat(reformattedValue, "))");
            }

            return "(".concat(param, " ").concat(operator, " ").concat(reformattedValue, ")");
          });
        });
        return filters.reduce(function (previousFilter, currentFilters) {
          return _toConsumableArray(previousFilter).concat(_toConsumableArray(currentFilters));
        }).join(' or ');
      }).map(function (filter) {
        return "(".concat(filter, ")");
      }).join(' and ');
      return handler.filter(renderedFilters);
    }
  }, {
    key: "__resolveSingle",
    value: function __resolveSingle(handler, params) {
      var _this3 = this;

      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
      return this.__resolve(handler, params, method).then(function (result) {
        return _this3.getTranslator().fromApi(result.data);
      });
    }
  }, {
    key: "__resolveMany",
    value: function () {
      var _resolveMany = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(handler, params) {
        var _this4 = this;

        var method,
            result,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                method = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'get';
                _context.next = 3;
                return this.__resolve(handler, params, method);

              case 3:
                result = _context.sent;
                return _context.abrupt("return", (result.data || []).map(function (item) {
                  return _this4.getTranslator().fromApi(item);
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function __resolveMany(_x, _x2) {
        return _resolveMany.apply(this, arguments);
      };
    }()
  }, {
    key: "__resolveManyIDs",
    value: function () {
      var _resolveManyIDs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(handler, params) {
        var idSelector,
            method,
            result,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                idSelector = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : function (item) {
                  return item.id;
                };
                method = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 'get';
                _context2.next = 4;
                return this.__resolve(handler, params, method);

              case 4:
                result = _context2.sent;
                return _context2.abrupt("return", (result.data || []).map(idSelector));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function __resolveManyIDs(_x3, _x4) {
        return _resolveManyIDs.apply(this, arguments);
      };
    }()
  }, {
    key: "__resolve",
    value: function () {
      var _resolve = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(handler) {
        var params,
            method,
            request,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
                method = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 'get';
                _context3.t0 = method;
                _context3.next = _context3.t0 === 'delete' ? 5 : _context3.t0 === 'patch' ? 7 : _context3.t0 === 'post' ? 9 : _context3.t0 === 'put' ? 11 : 13;
                break;

              case 5:
                request = handler.remove().save();
                return _context3.abrupt("break", 14);

              case 7:
                request = handler.patch(params).save();
                return _context3.abrupt("break", 14);

              case 9:
                request = handler.post(params).save();
                return _context3.abrupt("break", 14);

              case 11:
                request = handler.put(params).save();
                return _context3.abrupt("break", 14);

              case 13:
                request = handler.get();

              case 14:
                return _context3.abrupt("return", request.catch(function (error) {
                  window.console.error(method || 'get', error, handler, params);
                  throw error;
                }));

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function __resolve(_x5) {
        return _resolve.apply(this, arguments);
      };
    }()
  }]);

  return BaseODataDAO;
}(_Subscription2.default);

_defineProperty(BaseODataDAO, "_organizationID", null);

var _default = BaseODataDAO;
exports.default = _default;