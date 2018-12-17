"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RestDAO2 = _interopRequireDefault(require("./RestDAO"));

var _qs = _interopRequireDefault(require("qs"));

var _constants = require("../constants");

var _DefaultTranslator = _interopRequireDefault(require("../translators/DefaultTranslator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PourChartDAO =
/*#__PURE__*/
function (_RestDAO) {
  _inherits(PourChartDAO, _RestDAO);

  function PourChartDAO() {
    var _this;

    _classCallCheck(this, PourChartDAO);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PourChartDAO).call(this, {
      entityName: _constants.DAO_ENTITIES.POUR_CHART,
      translator: new _DefaultTranslator.default()
    }));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fetchChartData", function (params) {
      var queryString = _qs.default.stringify(_objectSpread({}, params, {
        ids: params.ids ? params.ids.join(',') : null
      }));

      return _this.__getOne("api/v2/chart/GetChart/?".concat(queryString), queryString);
    });

    return _this;
  }

  return PourChartDAO;
}(_RestDAO2.default);

var _default = new PourChartDAO();

exports.default = _default;