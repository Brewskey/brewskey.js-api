"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nullthrows = _interopRequireDefault(require("nullthrows"));

var _Config = _interopRequireDefault(require("./Config"));

var _StandardHeaders = _interopRequireDefault(require("./StandardHeaders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var parseError = function parseError(error) {
  if (error.ModelState) {
    var resultErrorMessage = '';
    Array.from(Object.values(error.ModelState)).forEach(function (fieldErrorArray) {
      var castedFieldErrorArray = fieldErrorArray;
      new Set(castedFieldErrorArray).forEach( // eslint-disable-next-line no-return-assign
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

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(path) {
    var options,
        reformatError,
        _options$headers,
        optionsHeaders,
        fetchOptions,
        headers,
        organizationId,
        pathWithOrganization,
        response,
        responseJson,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            reformatError = options.reformatError, _options$headers = options.headers, optionsHeaders = _options$headers === void 0 ? [] : _options$headers, fetchOptions = _objectWithoutProperties(options, ["reformatError", "headers"]);

            if (_Config.default.host) {
              _context.next = 4;
              break;
            }

            throw new Error('DAOApi: no host set');

          case 4:
            headers = new Headers();

            if (_Config.default.token) {
              headers.append('Authorization', "Bearer ".concat(_Config.default.token));
            }

            [].concat(_toConsumableArray(_StandardHeaders.default), _toConsumableArray(optionsHeaders)).forEach(function (_ref2) {
              var name = _ref2.name,
                  value = _ref2.value;
              return headers.append(name, value);
            });
            organizationId = _Config.default.organizationId;
            pathWithOrganization = path;

            if (organizationId) {
              pathWithOrganization = "".concat(path).concat(path.includes('?') ? '&' : '?', "organizationID=").concat(organizationId);
            }

            _context.next = 12;
            return fetch("".concat((0, _nullthrows.default)(_Config.default.host), "/").concat(pathWithOrganization), _objectSpread({}, fetchOptions, {
              headers: headers
            }));

          case 12:
            response = _context.sent;
            _context.prev = 13;
            _context.next = 16;
            return response.json();

          case 16:
            responseJson = _context.sent;
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](13);
            responseJson = null;

          case 22:
            if (response.ok) {
              _context.next = 26;
              break;
            }

            if (!(responseJson && reformatError)) {
              _context.next = 25;
              break;
            }

            throw new Error(reformatError(responseJson));

          case 25:
            throw new Error(responseJson ? parseError(responseJson) : 'Whoops! Error!');

          case 26:
            return _context.abrupt("return", responseJson);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[13, 19]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;