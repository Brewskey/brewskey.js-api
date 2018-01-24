'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DAO2 = require('./DAO');

var _DAO3 = _interopRequireDefault(_DAO2);

var _constants = require('../constants');

var _TapTranslator = require('../translators/TapTranslator');

var _TapTranslator2 = _interopRequireDefault(_TapTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TapDAO = function (_DAO) {
  _inherits(TapDAO, _DAO);

  function TapDAO() {
    _classCallCheck(this, TapDAO);

    return _possibleConstructorReturn(this, (TapDAO.__proto__ || Object.getPrototypeOf(TapDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.TAPS,
      navigationProperties: [{ name: 'device', select: ['id', 'isDeleted', 'name'] }, { name: 'location', select: ['id', 'isDeleted', 'name'] }, { name: 'organization', select: ['id', 'isDeleted', 'name'] }, {
        expand: [{ name: 'beverage', select: ['id', 'name'] }],
        name: 'currentKeg',
        select: ['id']
      }],
      translator: new _TapTranslator2.default()
    }));
  }

  return TapDAO;
}(_DAO3.default);

exports.default = new TapDAO();