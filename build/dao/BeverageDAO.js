'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ODataDAO2 = require('./ODataDAO');

var _ODataDAO3 = _interopRequireDefault(_ODataDAO2);

var _constants = require('../constants');

var _BeverageTranslator = require('../translators/BeverageTranslator');

var _BeverageTranslator2 = _interopRequireDefault(_BeverageTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BeverageDAO = function (_ODataDAO) {
  _inherits(BeverageDAO, _ODataDAO);

  function BeverageDAO() {
    _classCallCheck(this, BeverageDAO);

    return _possibleConstructorReturn(this, (BeverageDAO.__proto__ || Object.getPrototypeOf(BeverageDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.BEVERAGES,
      navigationProperties: {
        availability: { select: ['id', 'name'] },
        createdBy: { select: ['id', 'userName'] },
        glass: { select: ['id', 'name'] },
        srm: { select: ['hex', 'id', 'name'] },
        style: { select: ['id', 'name'] }
      },
      translator: new _BeverageTranslator2.default()
    }));
  }

  return BeverageDAO;
}(_ODataDAO3.default);

exports.default = new BeverageDAO();