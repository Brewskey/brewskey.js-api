"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _odata = _interopRequireDefault(require("odata"));
var _Subscription2 = _interopRequireDefault(require("./Subscription"));
var _constants = require("../constants");
var _Config = _interopRequireDefault(require("../Config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
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
var BaseODataDAO = /*#__PURE__*/function (_Subscription) {
  _inherits(BaseODataDAO, _Subscription);
  function BaseODataDAO(config) {
    var _this;
    _classCallCheck(this, BaseODataDAO);
    _this = _callSuper(this, BaseODataDAO);
    _defineProperty(_assertThisInitialized(_this), "__config", void 0);
    // todo figure out if we can remove that completly
    _defineProperty(_assertThisInitialized(_this), "__reformatIDValue", function (value) {
      return (
        // eslint-disable-next-line no-restricted-globals
        isNaN(value) || value === '' ? "'".concat(value, "'") : value
      );
    });
    _defineProperty(_assertThisInitialized(_this), "__reformatQueryValue", function (value) {
      return typeof value === 'string' && !Date.parse(value) ? "'".concat(encodeURIComponent(value), "'") : value;
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
    }
  }, {
    key: "__buildHandler",
    value: function __buildHandler() {
      var queryOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var shouldSelectExpand = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var handler = (0, _odata["default"])(this.getEntityName());
      return this.__setupHandler(handler, queryOptions, shouldSelectExpand);
    }
  }, {
    key: "__setupHandler",
    value: function __setupHandler(handler) {
      var queryOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var shouldExpand = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var apply = queryOptions.apply,
        shouldCount = queryOptions.shouldCount,
        search = queryOptions.search,
        skip = queryOptions.skip,
        take = queryOptions.take;
      var navProps = this.__config.navigationProperties;
      if (!search && shouldExpand && navProps) {
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
      if (search) {
        handler.customParam('$search', search);
      }
      if (apply) {
        handler.customParam('$apply', apply);
      }
      if (_Config["default"].organizationId && !queryOptions.shouldIgnoreOrganizationID) {
        handler.customParam('organizationID', _Config["default"].organizationId.toString());
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
      if (!queryOptions.filter && (!queryOptions.filters || !queryOptions.filters.length)) {
        return handler;
      }
      if (queryOptions.filters == null) {
        return handler.filter(queryOptions.filter);
      }
      var renderedFilters = queryOptions.filters.map(function (queryFilter) {
        var operator = queryFilter.operator,
          params = queryFilter.params,
          values = queryFilter.values;
        var isValidOperator = _constants.FILTER_FUNCTION_OPERATORS.find(function (op) {
          return op === operator;
        });
        var isAnyOperator = operator === _constants.FILTER_OPERATORS.ANY;
        var filters = values.map(function (value) {
          return params.map(function (param) {
            // Any operator should have the value pre-formatted
            if (isAnyOperator) {
              return "(".concat(param, "/any(").concat(value, "))");
            }

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
          return [].concat(_toConsumableArray(previousFilter), _toConsumableArray(currentFilters));
        }).join(' or ');
      }).map(function (filter) {
        return "(".concat(filter, ")");
      }).join(' and ');
      if (queryOptions.filter != null) {
        renderedFilters = "".concat(queryOptions.filter, " and ").concat(renderedFilters);
      }
      return handler.filter(renderedFilters);
    }
  }, {
    key: "__resolveSingle",
    value: function __resolveSingle(handler, params) {
      var _this3 = this;
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      return this.__resolve(handler, params, method).then(function (result) {
        return _this3.getTranslator().fromApi(result.data);
      });
    }
  }, {
    key: "__resolveMany",
    value: function () {
      var _resolveMany = _asyncToGenerator(function* (handler, params) {
        var _this4 = this;
        var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
        var result = yield this.__resolve(handler, params, method);
        return (result.data || []).map(function (item) {
          return _this4.getTranslator().fromApi(item);
        });
      });
      function __resolveMany(_x, _x2) {
        return _resolveMany.apply(this, arguments);
      }
      return __resolveMany;
    }()
  }, {
    key: "__resolveManyIDs",
    value: function () {
      var _resolveManyIDs = _asyncToGenerator(function* (handler, params) {
        var idSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (item) {
          return item.id;
        };
        var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';
        var result = yield this.__resolve(handler, params, method);
        return (result.data || []).map(idSelector);
      });
      function __resolveManyIDs(_x3, _x4) {
        return _resolveManyIDs.apply(this, arguments);
      }
      return __resolveManyIDs;
    }()
  }, {
    key: "__resolve",
    value: function () {
      var _resolve = _asyncToGenerator(function* (handler) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
        var request;
        switch (method) {
          case 'DELETE':
            {
              request = handler.remove().save();
              break;
            }
          case 'PATCH':
            {
              request = handler.patch(params).save();
              break;
            }
          case 'POST':
            {
              request = handler.post(params).save();
              break;
            }
          case 'PUT':
            {
              request = handler.put(params).save();
              break;
            }
          default:
            {
              request = handler.get();
            }
        }
        return request["catch"](function (error) {
          // window.console.error(method || 'get', error, handler, params);
          throw error;
        });
      });
      function __resolve(_x5) {
        return _resolve.apply(this, arguments);
      }
      return __resolve;
    }()
  }]);
  return BaseODataDAO;
}(_Subscription2["default"]);
var _default = exports["default"] = BaseODataDAO;