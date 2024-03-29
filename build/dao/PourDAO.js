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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var POURS_ACCUMULATE_TIMEOUT = 700;
var PourDAO = /*#__PURE__*/function (_ODataDAO) {
  _inherits(PourDAO, _ODataDAO);
  function PourDAO() {
    var _this;
    _classCallCheck(this, PourDAO);
    _this = _callSuper(this, PourDAO, [{
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
    }]);
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
  _createClass(PourDAO, [{
    key: "getPoursByBeverageIDs",
    value: function getPoursByBeverageIDs(beverageIDs, userID) {
      var filters = ["beverage/id in (".concat(beverageIDs.join(', '), ")"), userID != null ? "owner/id eq '".concat(userID, "'") : null, "isDeleted eq false"].filter(Boolean);
      var queryOptions = {
        apply: "filter((".concat(filters.join(') and ('), "))/groupby((beverage/id),aggregate(ounces with sum as total))"),
        shouldIgnoreOrganizationID: true
      };
      return this.__fetchCustom(this.__buildHandler(queryOptions, false), queryOptions).map(function (results) {
        return new Map(results.map(function (item) {
          return [item.beverage.id.toString(), item.total];
        }));
      });
    }
  }]);
  return PourDAO;
}(_ODataDAO2["default"]);
var _default = exports["default"] = new PourDAO();