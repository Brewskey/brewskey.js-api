'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CADENCE_MAP = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DefaultTranslator2 = require('./DefaultTranslator');

var _DefaultTranslator3 = _interopRequireDefault(_DefaultTranslator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CADENCE_MAP = exports.CADENCE_MAP = {
  Biweekly: 3,
  Daily: 1,
  Monthly: 4,
  OneTime: 0,
  Weekly: 2
};

// todo clean the translator when we will be merging loadObject to master

var ReportTranslator = function (_DefaultTranslator) {
  _inherits(ReportTranslator, _DefaultTranslator);

  function ReportTranslator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReportTranslator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReportTranslator.__proto__ || Object.getPrototypeOf(ReportTranslator)).call.apply(_ref, [this].concat(args))), _this), _this.toApi = _this.toApi.bind(_this), _this.toForm = _this.toForm.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReportTranslator, [{
    key: 'toApi',
    value: function toApi(_ref2) {
      var devices = _ref2.devices,
          locations = _ref2.locations,
          sendToEmails = _ref2.sendToEmails,
          taps = _ref2.taps,
          props = _objectWithoutProperties(_ref2, ['devices', 'locations', 'sendToEmails', 'taps']);

      return _extends({}, props, {
        deviceIds: devices ? devices.map(function (_ref3) {
          var id = _ref3.id;
          return id;
        }) : [],
        locationIds: locations ? locations.map(function (_ref4) {
          var id = _ref4.id;
          return id;
        }) : [],
        sendToEmails: sendToEmails.map(function (_ref5) {
          var email = _ref5.email;
          return email;
        }),
        tapIds: taps ? taps.map(function (_ref6) {
          var id = _ref6.id;
          return id;
        }) : []
      });
    }
  }, {
    key: 'toForm',
    value: function toForm(report) {
      return _extends({}, report, {
        reportCadence: CADENCE_MAP[report.reportCadence],
        sendToEmails: report.sendToEmails.map(function (email) {
          return {
            email: email
          };
        })
      });
    }
  }]);

  return ReportTranslator;
}(_DefaultTranslator3.default);

exports.default = ReportTranslator;