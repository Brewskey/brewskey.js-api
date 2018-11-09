'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseODataDAO2 = require('./BaseODataDAO');

var _BaseODataDAO3 = _interopRequireDefault(_BaseODataDAO2);

var _constants = require('../constants');

var _DefaultTranslator = require('../translators/DefaultTranslator');

var _DefaultTranslator2 = _interopRequireDefault(_DefaultTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PourChartDAO = function (_BaseODataDAO) {
  _inherits(PourChartDAO, _BaseODataDAO);

  function PourChartDAO() {
    _classCallCheck(this, PourChartDAO);

    var _this = _possibleConstructorReturn(this, (PourChartDAO.__proto__ || Object.getPrototypeOf(PourChartDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.POUR_CHART,
      translator: new _DefaultTranslator2.default()
    }));

    _this.fetchChartData = function (params) {
      return _this.__resolveSingle(_this.__buildHandler(), params, 'post');
    };

    return _this;
  }

  return PourChartDAO;
}(_BaseODataDAO3.default);

exports.default = new PourChartDAO();