"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ODataDAO2 = _interopRequireDefault(require("./ODataDAO"));

var _constants = require("../constants");

var _ReportTranslator = _interopRequireDefault(require("../translators/ReportTranslator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ReportDAO =
/*#__PURE__*/
function (_ODataDAO) {
  _inherits(ReportDAO, _ODataDAO);

  function ReportDAO() {
    _classCallCheck(this, ReportDAO);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReportDAO).call(this, {
      entityName: _constants.DAO_ENTITIES.REPORTS,
      navigationProperties: {
        devices: {
          select: ['id', 'isDeleted', 'name']
        },
        locations: {
          select: ['id', 'isDeleted', 'name']
        },
        taps: {
          select: ['id', 'isDeleted']
        }
      },
      translator: new _ReportTranslator.default()
    }));
  }

  return ReportDAO;
}(_ODataDAO2.default);

var _default = new ReportDAO();

exports.default = _default;