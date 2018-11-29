"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _odata = _interopRequireDefault(require("odata"));

var _eventSourcePolyfill = require("event-source-polyfill");

var _Subscription2 = _interopRequireDefault(require("./dao/Subscription"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CloudSSEManager =
/*#__PURE__*/
function (_Subscription) {
  _inherits(CloudSSEManager, _Subscription);

  function CloudSSEManager() {
    _classCallCheck(this, CloudSSEManager);

    return _possibleConstructorReturn(this, _getPrototypeOf(CloudSSEManager).apply(this, arguments));
  }

  _createClass(CloudSSEManager, null, [{
    key: "subscribe",
    value: function subscribe(handler, subscribeOptions) {
      var onError = subscribeOptions.onError,
          onOpen = subscribeOptions.onOpen;
      var session = new _eventSourcePolyfill.EventSourcePolyfill(CloudSSEManager._getUrl(subscribeOptions), {
        headers: CloudSSEManager._getHeaders()
      });
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

      session.addEventListener('error', CloudSSEManager.__emitError);

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

      CloudSSEManager._sessionByHandler.delete(handler);
    }
  }, {
    key: "_getUrl",
    value: function _getUrl(_ref) {
      var _ref$eventNamePrefix = _ref.eventNamePrefix,
          eventNamePrefix = _ref$eventNamePrefix === void 0 ? '' : _ref$eventNamePrefix,
          particleId = _ref.particleId;
      var endpoint = (0, _odata.default)().oConfig.endpoint;
      var devicesUrl = particleId ? "devices/".concat(particleId, "/events/") : 'events/';
      return "".concat(endpoint).concat(devicesUrl).concat(eventNamePrefix);
    }
  }, {
    key: "_getHeaders",
    value: function _getHeaders() {
      var _oHandler$oConfig$hea = (0, _odata.default)().oConfig.headers,
          oHeaders = _oHandler$oConfig$hea === void 0 ? [] : _oHandler$oConfig$hea;
      return oHeaders.reduce(function (acc, _ref2) {
        var name = _ref2.name,
            value = _ref2.value;
        return _objectSpread({}, acc, _defineProperty({}, name, value));
      }, {});
    }
  }]);

  return CloudSSEManager;
}(_Subscription2.default);

_defineProperty(CloudSSEManager, "_sessionByHandler", new Map());

var _default = CloudSSEManager;
exports.default = _default;