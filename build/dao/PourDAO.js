"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ODataDAO2 = _interopRequireDefault(require("./ODataDAO"));

var _constants = require("../constants");

var _PourTranslator = _interopRequireDefault(require("../translators/PourTranslator"));

var _signalr = _interopRequireDefault(require("../signalr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PourDAO =
/*#__PURE__*/
function (_ODataDAO) {
  _inherits(PourDAO, _ODataDAO);

  function PourDAO() {
    var _this;

    _classCallCheck(this, PourDAO);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PourDAO).call(this, {
      entityName: _constants.DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: {
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
      translator: new _PourTranslator.default()
    }));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isAutorefreshToggled", true);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "startAutorefresh", function () {
      if (_this.isAutorefreshToggled) {
        return;
      }

      _signalr.default.TapHub.registerListener('newPour', _this._onNewPour);

      _this.flushQueryCaches();

      _this.isAutorefreshToggled = true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "stopAutorefresh", function () {
      _signalr.default.TapHub.unregisterListener('newPour', _this._onNewPour);

      _this.isAutorefreshToggled = false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleAutorefresh", function () {
      if (_this.isAutorefreshToggled) {
        _this.stopAutorefresh();
      } else {
        _this.startAutorefresh();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onNewPour", function (pourId) {
      _this.fetchByID(pourId);

      _this.flushQueryCaches();
    });

    return _this;
  }

  return PourDAO;
}(_ODataDAO2.default);

var _default = new PourDAO();

exports.default = _default;