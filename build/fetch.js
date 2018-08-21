'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _odata = require('odata');

var _odata2 = _interopRequireDefault(_odata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, options) {
    var _oHandler$oConfig, endpoint, _oHandler$oConfig$hea, oheaders, headers, response, responseJson;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _oHandler$oConfig = (0, _odata2.default)().oConfig, endpoint = _oHandler$oConfig.endpoint, _oHandler$oConfig$hea = _oHandler$oConfig.headers, oheaders = _oHandler$oConfig$hea === undefined ? [] : _oHandler$oConfig$hea;

            if (endpoint) {
              _context.next = 3;
              break;
            }

            throw new Error('no-ohandler-endpoint');

          case 3:
            headers = new Headers();

            oheaders.forEach(function (_ref2) {
              var name = _ref2.name,
                  value = _ref2.value;
              return headers.append(name, value);
            });

            (options && options.headers || []).forEach(function (_ref3) {
              var name = _ref3.name,
                  value = _ref3.value;
              return headers.append(name, value);
            });

            _context.next = 8;
            return fetch(endpoint + '/' + path, _extends({}, options, { headers: headers }));

          case 8:
            response = _context.sent;
            responseJson = void 0;
            _context.prev = 10;
            _context.next = 13;
            return response.json();

          case 13:
            responseJson = _context.sent;
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](10);

            responseJson = null;

          case 19:
            if (response.ok) {
              _context.next = 21;
              break;
            }

            throw new Error(responseJson.error && responseJson.error.message || 'Whoops! Error!');

          case 21:
            return _context.abrupt('return', responseJson);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[10, 16]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();