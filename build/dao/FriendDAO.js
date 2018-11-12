"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FRIEND_STATUSES = void 0;

var _ODataDAO2 = _interopRequireDefault(require("./ODataDAO"));

var _constants = require("../constants");

var _DefaultTranslator = _interopRequireDefault(require("../translators/DefaultTranslator"));

var _fetch = _interopRequireDefault(require("../fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FRIEND_STATUSES = {
  APPROVED: 'Approved',
  AWAITING_APPROVAL: 'AwaitingApproval',
  BLOCKED: 'Blocked',
  PENDING: 'Pending',
  SPAM: 'Spam'
};
exports.FRIEND_STATUSES = FRIEND_STATUSES;

var FriendDAO =
/*#__PURE__*/
function (_ODataDAO) {
  _inherits(FriendDAO, _ODataDAO);

  function FriendDAO() {
    _classCallCheck(this, FriendDAO);

    return _possibleConstructorReturn(this, _getPrototypeOf(FriendDAO).call(this, {
      entityName: _constants.DAO_ENTITIES.FRIENDS,
      navigationProperties: {
        friendAccount: {
          select: ['id', 'userName']
        },
        owningAccount: {
          select: ['id', 'userName']
        }
      },
      translator: new _DefaultTranslator.default()
    }));
  }

  _createClass(FriendDAO, [{
    key: "addFriend",
    value: function addFriend(userNameOrEmail) {
      return (0, _fetch.default)('friends/Default.addByUserName()/', {
        body: JSON.stringify({
          userName: userNameOrEmail
        }),
        headers: [{
          name: 'Accept',
          value: 'application/json'
        }, {
          name: 'Content-Type',
          value: 'application/json'
        }],
        method: 'post'
      });
    }
  }]);

  return FriendDAO;
}(_ODataDAO2.default);

var _default = new FriendDAO();

exports.default = _default;