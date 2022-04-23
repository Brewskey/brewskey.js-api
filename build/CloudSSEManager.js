"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Subscription2 = _interopRequireDefault(require("./dao/Subscription"));

var _nullthrows = _interopRequireDefault(require("nullthrows"));

var _Config = _interopRequireDefault(require("./Config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CloudSSEManager = /*#__PURE__*/function (_Subscription) {
  _inherits(CloudSSEManager, _Subscription);

  var _super = _createSuper(CloudSSEManager);

  function CloudSSEManager() {
    _classCallCheck(this, CloudSSEManager);

    return _super.apply(this, arguments);
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

var _default = CloudSSEManager;
exports["default"] = _default;