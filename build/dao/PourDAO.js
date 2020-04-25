"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ODataDAO2 = _interopRequireDefault(require("./ODataDAO"));

var _constants = require("../constants");

var _PourTranslator = _interopRequireDefault(require("../translators/PourTranslator"));

var _signalr = _interopRequireDefault(require("../signalr"));

var _debounce = _interopRequireDefault(require("debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var POURS_ACCUMULATE_TIMEOUT = 700;

var PourDAO = /*#__PURE__*/function (_ODataDAO) {
  _inherits(PourDAO, _ODataDAO);

  var _super = _createSuper(PourDAO);

  function PourDAO() {
    var _this;

    _classCallCheck(this, PourDAO);

    _this = _super.call(this, {
      entityName: _constants.DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: {
          select: ['id', 'isDeleted', 'name']
        },
        device: {
          select: ['id', 'isDeleted', 'name']
        },
        keg: {
          select: ['id']
        },
        location: {
          select: ['id', 'isDeleted', 'name']
        },
        organization: {
          select: ['id', 'isDeleted', 'name']
        },
        owner: {
          select: ['id', 'userName']
        },
        tap: {
          select: ['id', 'isDeleted']
        }
      },
      translator: new _PourTranslator["default"]()
    });

    _defineProperty(_assertThisInitialized(_this), "isAutoflushToggled", true);

    _defineProperty(_assertThisInitialized(_this), "_accumulatedIds", new Set());

    _defineProperty(_assertThisInitialized(_this), "startAutoflush", function () {
      if (_this.isAutoflushToggled) {
        return;
      }

      _this.flushQueryCaches();

      _this.isAutoflushToggled = true;
    });

    _defineProperty(_assertThisInitialized(_this), "stopAutoflush", function () {
      _this.isAutoflushToggled = false;
    });

    _defineProperty(_assertThisInitialized(_this), "toggleAutoflush", function () {
      if (_this.isAutoflushToggled) {
        _this.stopAutoflush();
      } else {
        _this.startAutoflush();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onNewPourDebounced", (0, _debounce["default"])(function () {
      _this.fetchByIDs(Array.from(_this._accumulatedIds));

      if (_this.isAutoflushToggled) {
        _this._accumulatedIds.forEach(function (id) {
          return _this.flushCacheForEntity(id);
        });

        _this.flushQueryCaches();
      }

      _this._accumulatedIds.clear();
    }, POURS_ACCUMULATE_TIMEOUT));

    _defineProperty(_assertThisInitialized(_this), "_onNewPour", function (pourId) {
      _this._accumulatedIds.add(pourId);

      _this._onNewPourDebounced();
    });

    _signalr["default"].TapHub.registerListener('newPour', _this._onNewPour);

    return _this;
  }

  return PourDAO;
}(_ODataDAO2["default"]);

var _default = new PourDAO();

exports["default"] = _default;