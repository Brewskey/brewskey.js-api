"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fetch = _interopRequireDefault(require("./fetch"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var reformatLoginResponse = function reformatLoginResponse(response) {
  return _objectSpread(_objectSpread({}, response), {}, {
    accessToken: response.access_token,
    expiresAt: response['.expires'],
    expiresIn: response.expires_in,
    issuedAt: response['.issued'],
    refreshToken: response.refresh_token,
    roles: JSON.parse(response.roles),
    tokenType: response.token_type,
    userLogins: JSON.parse(response.userLogins)
  });
};
var Auth = /*#__PURE__*/function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }
  _createClass(Auth, [{
    key: "changePassword",
    value: function changePassword(changePasswordArgs) {
      return (0, _fetch["default"])('api/account/change-password/', {
        body: JSON.stringify(_objectSpread(_objectSpread({}, changePasswordArgs), {}, {
          confirmPassword: changePasswordArgs.newPassword
        })),
        headers: [{
          name: 'Content-type',
          value: 'application/json'
        }],
        method: 'POST'
      });
    }
  }, {
    key: "fetchRoles",
    value: function fetchRoles() {
      return (0, _fetch["default"])('api/v2/roles/');
    }
  }, {
    key: "login",
    value: function login(_ref) {
      var password = _ref.password,
        userName = _ref.userName;
      return (0, _fetch["default"])("token/", {
        body: "grant_type=password&userName=".concat(userName, "&password=").concat(password),
        headers: [{
          name: 'Content-type',
          value: 'application/x-www-form-urlencoded'
        }],
        method: 'POST'
      }).then(reformatLoginResponse);
    }
  }, {
    key: "refreshToken",
    value: function refreshToken(_refreshToken) {
      return (0, _fetch["default"])("token/", {
        body: "grant_type=refresh_token&refresh_token=".concat(_refreshToken),
        headers: [{
          name: 'Content-type',
          value: 'application/x-www-form-urlencoded'
        }],
        method: 'POST'
      }).then(reformatLoginResponse);
    }
  }, {
    key: "register",
    value: function register(registerArgs) {
      return (0, _fetch["default"])('api/account/register/', {
        body: JSON.stringify(registerArgs),
        headers: [{
          name: 'Content-type',
          value: 'application/json'
        }],
        method: 'POST'
      });
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(email) {
      return (0, _fetch["default"])('api/account/reset-password/', {
        body: JSON.stringify({
          email: email
        }),
        headers: [{
          name: 'Content-type',
          value: 'application/json'
        }],
        method: 'POST'
      });
    }
  }]);
  return Auth;
}();
var _default = exports["default"] = new Auth();