'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RestDAO2 = require('./RestDAO');

var _RestDAO3 = _interopRequireDefault(_RestDAO2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CloudDeviceDAO = function (_RestDAO) {
  _inherits(CloudDeviceDAO, _RestDAO);

  function CloudDeviceDAO() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CloudDeviceDAO);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CloudDeviceDAO.__proto__ || Object.getPrototypeOf(CloudDeviceDAO)).call.apply(_ref, [this].concat(args))), _this), _this.get = _this.get.bind(_this), _this.flash = _this.flash.bind(_this), _this.ping = _this.ping.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CloudDeviceDAO, [{
    key: 'get',
    value: function get(particleId) {
      return this.__fetchOnce('cloud-devices/' + particleId + '/');
    }
  }, {
    key: 'flash',
    value: function flash(particleId, file) {
      var formData = new FormData();
      formData.append('file', file);
      // todo queryParams
      return this.__fetchOnce('cloud-devices/' + particleId + '/flash/', {
        body: formData,
        headers: [{
          name: 'Content-Type',
          value: 'multipart/form-data'
        }],
        method: 'PUT'
      });
    }
  }, {
    key: 'ping',
    value: function ping(particleId) {
      return this.__fetchOnce('cloud-devices/' + particleId + '/ping/', {
        method: 'PUT'
      });
    }
  }]);

  return CloudDeviceDAO;
}(_RestDAO3.default);

exports.default = CloudDeviceDAO;