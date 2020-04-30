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

var MAX_OUNCES_BY_KEG_TYPE = {
  Cornelius: 640,
  HalfBarrel: 1984,
  Mini: 169,
  QuarterBarrel: 992,
  SixthBarrel: 661,
  SlimQuarter: 992
};
exports.MAX_OUNCES_BY_KEG_TYPE = MAX_OUNCES_BY_KEG_TYPE;

var KegDAO = /*#__PURE__*/function (_ODataDAO) {
  _inherits(KegDAO, _ODataDAO);

  var _super = _createSuper(KegDAO);

  function KegDAO() {
    var _this;

    _classCallCheck(this, KegDAO);

    _this = _super.call(this, {
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
    });

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

var _default = new KegDAO();

exports["default"] = _default;