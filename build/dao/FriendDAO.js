'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DAO2 = require('./DAO');

var _DAO3 = _interopRequireDefault(_DAO2);

var _constants = require('../constants');

var _DefaultTranslator = require('../translators/DefaultTranslator');

var _DefaultTranslator2 = _interopRequireDefault(_DefaultTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FriendDAO = function (_DAO) {
  _inherits(FriendDAO, _DAO);

  function FriendDAO() {
    _classCallCheck(this, FriendDAO);

    return _possibleConstructorReturn(this, (FriendDAO.__proto__ || Object.getPrototypeOf(FriendDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.FRIENDS,
      selectExpandQuery: {
        expand: {
          friendAccount: ['id', 'phoneNumber', 'userName']
        }
      },
      translator: new _DefaultTranslator2.default()
    }));
  }

  return FriendDAO;
}(_DAO3.default);

exports.default = new FriendDAO();