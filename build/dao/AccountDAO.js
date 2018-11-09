'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ODataDAO2 = require('./ODataDAO');

var _ODataDAO3 = _interopRequireDefault(_ODataDAO2);

var _constants = require('../constants');

var _DefaultTranslator = require('../translators/DefaultTranslator');

var _DefaultTranslator2 = _interopRequireDefault(_DefaultTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountDAO = function (_ODataDAO) {
  _inherits(AccountDAO, _ODataDAO);

  function AccountDAO() {
    _classCallCheck(this, AccountDAO);

    return _possibleConstructorReturn(this, (AccountDAO.__proto__ || Object.getPrototypeOf(AccountDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.ACCOUNTS,
      translator: new _DefaultTranslator2.default()
    }));
  }

  return AccountDAO;
}(_ODataDAO3.default);

exports.default = new AccountDAO();