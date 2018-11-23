"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _odata = _interopRequireDefault(require("odata"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(path) {
    var options,
        reformatError,
        fetchOptions,
        _oHandler$oConfig,
        endpoint,
        _oHandler$oConfig$hea,
        oheaders,
        headers,
        response,
        responseJson,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            reformatError = options.reformatError, fetchOptions = _objectWithoutProperties(options, ["reformatError"]);
            _oHandler$oConfig = (0, _odata.default)().oConfig, endpoint = _oHandler$oConfig.endpoint, _oHandler$oConfig$hea = _oHandler$oConfig.headers, oheaders = _oHandler$oConfig$hea === void 0 ? [] : _oHandler$oConfig$hea;

            if (endpoint) {
              _context.next = 5;
              break;
            }

            throw new Error('no-ohandler-endpoint');

          case 5:
            headers = new Headers();
            oheaders.forEach(function (_ref2) {
              var name = _ref2.name,
                  value = _ref2.value;
              return headers.append(name, value);
            });
            (options.headers || []).forEach(function (_ref3) {
              var name = _ref3.name,
                  value = _ref3.value;
              return headers.append(name, value);
            });
            _context.next = 10;
            return fetch("".concat(endpoint).concat(path), _objectSpread({}, fetchOptions, {
              headers: headers
            }));

          case 10:
            response = _context.sent;
            _context.prev = 11;
            _context.next = 14;
            return response.json();

          case 14:
            responseJson = _context.sent;
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](11);
            responseJson = null;

          case 20:
            if (response.ok) {
              _context.next = 24;
              break;
            }

            if (!(responseJson && reformatError)) {
              _context.next = 23;
              break;
            }

            throw new Error(reformatError(responseJson));

          case 23:
            throw new Error(responseJson && responseJson.error && responseJson.error.message || 'Whoops! Error!');

          case 24:
            return _context.abrupt("return", responseJson);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[11, 17]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;