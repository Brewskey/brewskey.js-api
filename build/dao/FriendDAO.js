'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FRIEND_STATUSES = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DAO2 = require('./DAO');

var _DAO3 = _interopRequireDefault(_DAO2);

var _constants = require('../constants');

var _DefaultTranslator = require('../translators/DefaultTranslator');

var _DefaultTranslator2 = _interopRequireDefault(_DefaultTranslator);

var _fetch = require('../fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FRIEND_STATUSES = exports.FRIEND_STATUSES = {
  APPROVED: 'Approved',
  BLOCKED: 'Blocked',
  PENDING: 'Pending',
  SPAM: 'Spam'
};

var FriendDAO = function (_DAO) {
  _inherits(FriendDAO, _DAO);

  function FriendDAO() {
    _classCallCheck(this, FriendDAO);

    var _this = _possibleConstructorReturn(this, (FriendDAO.__proto__ || Object.getPrototypeOf(FriendDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.FRIENDS,
      navigationProperties: {
        friendAccount: { select: ['id', 'phoneNumber', 'userName'] }
      },
      translator: new _DefaultTranslator2.default()
    }));

    _this.addFriend = _this.addFriend.bind(_this);
    return _this;
  }

  _createClass(FriendDAO, [{
    key: 'addFriend',
    value: function addFriend(userNameOrEmail) {
      return (0, _fetch2.default)('friends/Default.addByUserName()/', {
        body: JSON.stringify({ userName: userNameOrEmail }),
        headers: [{ name: 'Accept', value: 'application/json' }, { name: 'Content-Type', value: 'application/json' }],
        method: 'post'
      });
    }
  }]);

  return FriendDAO;
}(_DAO3.default);

exports.default = new FriendDAO();