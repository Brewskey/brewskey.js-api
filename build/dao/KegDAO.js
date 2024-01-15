"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MAX_OUNCES_BY_KEG_TYPE = void 0;
var _ODataDAO2 = _interopRequireDefault(require("./ODataDAO"));
var _KegTranslator = _interopRequireDefault(require("../translators/KegTranslator"));
var _LoadObject = _interopRequireDefault(require("../LoadObject"));
var _constants = require("../constants");
var _filters = require("../filters");
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
var MAX_OUNCES_BY_KEG_TYPE = exports.MAX_OUNCES_BY_KEG_TYPE = {
  Cornelius: 640,
  FiftyLitre: 1690.7,
  HalfBarrel: 1984,
  Mini: 169,
  QuarterBarrel: 992,
  SixthBarrel: 661,
  SlimQuarter: 992
};
var KegDAO = /*#__PURE__*/function (_ODataDAO) {
  _inherits(KegDAO, _ODataDAO);
  function KegDAO() {
    var _this;
    _classCallCheck(this, KegDAO);
    _this = _callSuper(this, KegDAO, [{
      entityName: _constants.DAO_ENTITIES.KEGS,
      navigationProperties: {
        beverage: {
          select: ['id', 'isDeleted', 'name']
        },
        location: {
          select: ['id', 'isDeleted', 'name']
        },
        organization: {
          select: ['id', 'isDeleted', 'name']
        },
        tap: {
          select: ['id', 'isDeleted']
        }
      },
      translator: new _KegTranslator["default"]()
    }]);
    _defineProperty(_assertThisInitialized(_this), "fetchKegByTapID", function (tapId) {
      return _this.fetchMany({
        filters: [(0, _filters.createFilter)('tap/id').equals(tapId)],
        orderBy: [{
          column: 'tapDate',
          direction: 'desc'
        }],
        take: 1
      });
    });
    return _this;
  }
  _createClass(KegDAO, [{
    key: "floatKeg",
    value: function floatKeg(tapID) {
      var funcString = 'Default.floatKeg()';
      var stringifiedID = tapID.toString();
      var handler = this.__buildHandler({}, false).find(this.__reformatIDValue(stringifiedID)).func(funcString);
      return this.__mutateCustom(handler, 'PUT', tapID, null);
    }
  }]);
  return KegDAO;
}(_ODataDAO2["default"]);
var _default = exports["default"] = new KegDAO();