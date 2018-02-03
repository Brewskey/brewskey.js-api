'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _odata = require('odata');

var _odata2 = _interopRequireDefault(_odata);

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

    var _this = _possibleConstructorReturn(this, (TapDAO.__proto__ || Object.getPrototypeOf(TapDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.TAPS,
      navigationProperties: {
        currentKeg: {
          expand: { beverage: { select: ['id', 'name'] } },
          select: ['id', 'maxOunces', 'ounces']
        },
        device: { select: ['id', 'isDeleted', 'name'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] }
      },
      translator: new _TapTranslator2.default()
    }));

    _this.countLeaderboard = _this.countLeaderboard.bind(_this);
    _this.fetchLeaderboard = _this.fetchLeaderboard.bind(_this);
    return _this;
  }

  _createClass(TapDAO, [{
    key: 'countLeaderboard',
    value: function countLeaderboard(tapID, duration, queryOptions) {
      var _this2 = this;

      var funcString = 'Default.leaderboard(timeSpan=duration\'' + duration + '\')';
      var stringifiedID = tapID.toString();

      return this.__countCustom(function (countQueryOptions) {
        var handler = _this2.__buildHandler(_extends({}, queryOptions, countQueryOptions), false).find(_this2.__reformatIDValue(stringifiedID));
        handler.func(funcString);

        return handler;
      }, queryOptions, funcString);
    }
  }, {
    key: 'fetchLeaderboard',
    value: function fetchLeaderboard(tapID, duration, queryOptions) {
      var funcString = 'Default.leaderboard(timeSpan=duration\'' + duration + '\')';
      var stringifiedID = tapID.toString();

      var handler = this.__buildHandler(queryOptions, false).find(this.__reformatIDValue(stringifiedID));
      handler.func(funcString);

      return this.__fetchCustom(handler, queryOptions, funcString);
    }
  }]);

  return TapDAO;
}(_DAO3.default);

exports.default = new TapDAO();