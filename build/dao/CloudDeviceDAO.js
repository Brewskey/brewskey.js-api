"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RestDAO2 = _interopRequireDefault(require("./RestDAO"));
var _CloudSSEManager = _interopRequireDefault(require("../CloudSSEManager"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var DEVICE_ONLINE_STATUS_EVENT_NAME = 'spark/status';
var CloudDeviceDAO = /*#__PURE__*/function (_RestDAO) {
  _inherits(CloudDeviceDAO, _RestDAO);
  function CloudDeviceDAO() {
    var _this;
    _classCallCheck(this, CloudDeviceDAO);
    _this = _callSuper(this, CloudDeviceDAO, [{
      entityName: 'cloud-devices'
    }]);
    _defineProperty(_assertThisInitialized(_this), "_isOnlineStatusListenerToggled", false);
    _defineProperty(_assertThisInitialized(_this), "_onNewCloudSystemEvent", function (cloudEvent) {
      var data = cloudEvent.data,
        name = cloudEvent.name,
        particleId = cloudEvent.particleId;
      if (name !== DEVICE_ONLINE_STATUS_EVENT_NAME) {
        return;
      }
      _this.__updateEntityByID(particleId, function (cloudDevice) {
        return _objectSpread(_objectSpread({}, cloudDevice), {}, {
          connected: data === 'online'
        });
      });
    });
    return _this;
  }
  _createClass(CloudDeviceDAO, [{
    key: "getOne",
    value: function getOne(particleId) {
      return this.__getOne("api/v2/cloud-devices/".concat(particleId, "/"), particleId, {
        reformatError: function reformatError(error) {
          return error.error;
        }
      });
    }
  }, {
    key: "flash",
    value: function flash(particleId, file) {
      return this.__fetchOne("api/v2/cloud-devices/".concat(particleId, "/flash/"), {
        body: JSON.stringify({
          file: file,
          particleId: particleId
        }),
        headers: [{
          name: 'Accept',
          value: 'application/json'
        }, {
          name: 'Content-Type',
          value: 'application/json'
        }],
        method: 'PUT',
        reformatError: function reformatError(error) {
          return error.error;
        }
      });
    }
  }, {
    key: "startOnlineStatusListener",
    value: function startOnlineStatusListener() {
      if (this._isOnlineStatusListenerToggled) {
        return;
      }
      _CloudSSEManager["default"].subscribe(this._onNewCloudSystemEvent, {
        eventNamePrefix: 'spark'
      });
    }
  }, {
    key: "stopOnlineStatusListener",
    value: function stopOnlineStatusListener() {
      _CloudSSEManager["default"].unsubscribe(this._onNewCloudSystemEvent);
    }
  }, {
    key: "toggleOnlineStatusListener",
    value: function toggleOnlineStatusListener() {
      if (!this._isOnlineStatusListenerToggled) {
        this.startOnlineStatusListener();
      } else {
        this.stopOnlineStatusListener();
      }
    }
  }]);
  return CloudDeviceDAO;
}(_RestDAO2["default"]);
var _default = exports["default"] = new CloudDeviceDAO();