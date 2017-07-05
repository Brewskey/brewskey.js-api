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

var ReportTranslator = function (_DefaultTranslator) {
  _inherits(ReportTranslator, _DefaultTranslator);

  function ReportTranslator() {
    _classCallCheck(this, ReportTranslator);

    return _possibleConstructorReturn(this, (ReportTranslator.__proto__ || Object.getPrototypeOf(ReportTranslator)).apply(this, arguments));
  }

  _createClass(ReportTranslator, [{
    key: 'toApi',
    value: function toApi(_ref) {
      var devices = _ref.devices,
          locations = _ref.locations,
          sendToEmails = _ref.sendToEmails,
          taps = _ref.taps,
          props = _objectWithoutProperties(_ref, ['devices', 'locations', 'sendToEmails', 'taps']);

      return _extends({}, props, {
        deviceIds: devices ? devices.map(function (device) {
          return device.id;
        }) : [],
        locationIds: locations ? locations.map(function (location) {
          return location.id;
        }) : [],
        sendToEmails: sendToEmails.map(function (emailObject) {
          return emailObject.email;
        }),
        tapIds: taps ? taps.map(function (tap) {
          return tap.id;
        }) : []
      });
    }
  }, {
    key: 'toForm',
    value: function toForm(report) {
      return _extends({}, report, {
        reportCadence: CADENCE_MAP[report.reportCadence],
        sendToEmails: report.sendToEmails.map(function (email) {
          return { email: email };
        })
      });
    }
  }]);

  return ReportTranslator;
}(_DefaultTranslator3.default);

exports.default = ReportTranslator;