"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Subscription2 = _interopRequireDefault(require("./dao/Subscription"));
var _nullthrows = _interopRequireDefault(require("nullthrows"));
var _Config = _interopRequireDefault(require("./Config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CloudSSEManager = /*#__PURE__*/function (_Subscription) {
  _inherits(CloudSSEManager, _Subscription);
  function CloudSSEManager() {
    _classCallCheck(this, CloudSSEManager);
    return _callSuper(this, CloudSSEManager, arguments);
  }
  _createClass(CloudSSEManager, null, [{
    key: "subscribe",
    value: function subscribe(handler, subscribeOptions) {
      var onError = subscribeOptions.onError,
        onOpen = subscribeOptions.onOpen;
      var session = new EventSource(CloudSSEManager._getUrl(subscribeOptions));
      session.addEventListener('message', function (sseEvent) {
        try {
          var cloudEventStr = sseEvent.data;
          var cloudEvent = JSON.parse(cloudEventStr);
          var name = cloudEvent.name,
            particleId = cloudEvent.coreid,
            data = cloudEvent.data,
            publishedAt = cloudEvent.published_at;
          handler({
            data: data,
            name: name,
            particleId: particleId,
            publishedAt: publishedAt
          });
        } catch (error) {
          CloudSSEManager.__emitError(error);
          if (onError) {
            onError(error);
          }
        }
      });
      if (onOpen) {
        session.addEventListener('open', onOpen);
      }
      if (onError) {
        session.addEventListener('error', onError);
      }
      session.addEventListener('error', function (event) {
        CloudSSEManager.__emitError(new Error(JSON.stringify(event)));
      });
      CloudSSEManager._sessionByHandler.set(handler, session);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(handler) {
      var session = CloudSSEManager._sessionByHandler.get(handler);
      if (!session) {
        return;
      }
      session.close();
      CloudSSEManager._sessionByHandler["delete"](handler);
    }
  }, {
    key: "_getUrl",
    value: function _getUrl(_ref) {
      var _ref$eventNamePrefix = _ref.eventNamePrefix,
        eventNamePrefix = _ref$eventNamePrefix === void 0 ? '' : _ref$eventNamePrefix,
        particleId = _ref.particleId;
      var devicesUrl = particleId ? "devices/".concat(particleId, "/events/") : 'events/';
      return "".concat((0, _nullthrows["default"])(_Config["default"].host), "/api/v2/").concat(devicesUrl).concat(eventNamePrefix, "/?access_token=").concat((0, _nullthrows["default"])(_Config["default"].token));
    }
  }]);
  return CloudSSEManager;
}(_Subscription2["default"]);
_defineProperty(CloudSSEManager, "_sessionByHandler", new Map());
var _default = exports["default"] = CloudSSEManager;