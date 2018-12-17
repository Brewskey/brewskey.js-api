"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fetch = _interopRequireDefault(require("./fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reformatLoginResponse = function reformatLoginResponse(response) {
  return _objectSpread({}, response, {
    accessToken: response.access_token,
    expiresAt: response['.expires'],
    expiresIn: response.expires_in,
    issuedAt: response['.issued'],
    refreshToken: response.refresh_token,
    tokenType: response.token_type
  });
};

var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, [{
    key: "fetchRoles",
    value: function fetchRoles() {
      return (0, _fetch.default)('api/v2/roles/');
    }
  }, {
    key: "login",
    value: function login(_ref) {
      var password = _ref.password,
          userName = _ref.userName;
      return (0, _fetch.default)("token/", {
        body: "grant_type=password&userName=".concat(userName, "&password=").concat(password),
        headers: [{
          name: 'Content-type',
          value: 'application/x-www-form-urlencoded'
        }],
        method: 'POST',
        reformatError: function reformatError(error) {
          return error.error_description;
        }
      }).then(reformatLoginResponse);
    }
  }, {
    key: "refreshToken",
    value: function refreshToken(_refreshToken) {
      return (0, _fetch.default)("token/", {
        body: "grant_type=refresh_token&refresh_token=".concat(_refreshToken),
        headers: [{
          name: 'Content-type',
          value: 'application/x-www-form-urlencoded'
        }],
        method: 'POST',
        reformatError: function reformatError(error) {
          return error.error_description;
        }
      }).then(reformatLoginResponse);
    }
  }]);

  return Auth;
}();

var _default = new Auth();

exports.default = _default;