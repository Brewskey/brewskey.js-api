"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nullthrows = _interopRequireDefault(require("nullthrows"));
var _Config = _interopRequireDefault(require("./Config"));
var _StandardHeaders = _interopRequireDefault(require("./StandardHeaders"));
var _excluded = ["reformatError", "headers"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var parseError = function parseError(error) {
  if (error.ModelState) {
    var resultErrorMessage = '';
    Array.from(Object.values(error.ModelState)).forEach(function (fieldErrorArray) {
      var castedFieldErrorArray = fieldErrorArray;
      new Set(castedFieldErrorArray).forEach(
      // eslint-disable-next-line no-return-assign
      function (fieldError) {
        return resultErrorMessage = "".concat(resultErrorMessage, "\n").concat(fieldError);
      });
    });
    return resultErrorMessage;
  }
  if (error.error_description) {
    return error.error_description;
  }
  if (error.Message) {
    return error.Message;
  }
  return "Whoa! Brewskey had an error. We'll try to get it fixed soon.";
};
var _default = exports["default"] = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var reformatError = options.reformatError,
      _options$headers = options.headers,
      optionsHeaders = _options$headers === void 0 ? [] : _options$headers,
      fetchOptions = _objectWithoutProperties(options, _excluded);
    if (!_Config["default"].host) {
      throw new Error('DAOApi: no host set');
    }
    var headers = new Headers();
    if (_Config["default"].token) {
      headers.append('Authorization', "Bearer ".concat(_Config["default"].token));
    }
    [].concat(_toConsumableArray(_StandardHeaders["default"]), _toConsumableArray(optionsHeaders)).forEach(function (_ref2) {
      var name = _ref2.name,
        value = _ref2.value;
      return headers.append(name, value);
    });
    var organizationId = _Config["default"].organizationId;
    var pathWithOrganization = path;
    if (organizationId) {
      pathWithOrganization = "".concat(path).concat(path.includes('?') ? '&' : '?', "organizationID=").concat(organizationId);
    }
    var response = yield fetch("".concat((0, _nullthrows["default"])(_Config["default"].host), "/").concat(pathWithOrganization), _objectSpread(_objectSpread({}, fetchOptions), {}, {
      headers: headers
    }));
    var responseJson;
    try {
      responseJson = yield response.json();
    } catch (error) {
      responseJson = null;
    }
    if (!response.ok) {
      if (responseJson && reformatError) {
        throw new Error(reformatError(responseJson));
      }
      throw new Error(responseJson ? parseError(responseJson) : 'Whoops! Error!');
    }
    return responseJson;
  });
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();