'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DAO2 = require('./DAO');

var _DAO3 = _interopRequireDefault(_DAO2);

var _handler = require('../handler');

var _handler2 = _interopRequireDefault(_handler);

var _constants = require('../constants');

var _DefaultTranslator = require('../translators/DefaultTranslator');

var _DefaultTranslator2 = _interopRequireDefault(_DefaultTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PourDAO = function (_DAO) {
  _inherits(PourDAO, _DAO);

  function PourDAO() {
    _classCallCheck(this, PourDAO);

    var _this = _possibleConstructorReturn(this, (PourDAO.__proto__ || Object.getPrototypeOf(PourDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: ['id', 'name'],
        location: ['id', 'name'],
        owner: ['id', 'userName'],
        tap: ['id', 'name']
      },
      translator: new _DefaultTranslator2.default()
    }));

    _this.fetchChartData = function (params) {
      return _this._resolve((0, _handler2.default)('chart'), // TODO this is a hacky crutch for change endpoint
      // on the fly..come up better solution,
      params, 'post');
    };

    return _this;
  }

  return PourDAO;
}(_DAO3.default);

exports.default = new PourDAO();