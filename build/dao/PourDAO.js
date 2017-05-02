'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DAO2 = require('./DAO');

var _DAO3 = _interopRequireDefault(_DAO2);

var _constants = require('../constants');

var _PourTranslator = require('../translators/PourTranslator');

var _PourTranslator2 = _interopRequireDefault(_PourTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PourDAO = function (_DAO) {
  _inherits(PourDAO, _DAO);

  function PourDAO() {
    _classCallCheck(this, PourDAO);

    return _possibleConstructorReturn(this, (PourDAO.__proto__ || Object.getPrototypeOf(PourDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: ['id', 'isDeleted', 'name'],
        location: ['id', 'isDeleted', 'name'],
        owner: ['id', 'userName'],
        tap: ['id', 'isDeleted', 'name']
      },
      translator: new _PourTranslator2.default()
    }));
  }

  return PourDAO;
}(_DAO3.default);

exports.default = new PourDAO();