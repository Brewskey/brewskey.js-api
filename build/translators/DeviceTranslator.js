'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DefaultTranslator2 = require('./DefaultTranslator');

var _DefaultTranslator3 = _interopRequireDefault(_DefaultTranslator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeviceTranslator = function (_DefaultTranslator) {
  _inherits(DeviceTranslator, _DefaultTranslator);

  function DeviceTranslator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DeviceTranslator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DeviceTranslator.__proto__ || Object.getPrototypeOf(DeviceTranslator)).call.apply(_ref, [this].concat(args))), _this), _this.fromApi = _this.fromApi.bind(_this), _this.toForm = _this.toForm.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DeviceTranslator, [{
    key: 'fromApi',
    value: function fromApi(apiValue) {
      return _extends({}, _get(DeviceTranslator.prototype.__proto__ || Object.getPrototypeOf(DeviceTranslator.prototype), 'fromApi', this).call(this, apiValue), {
        location: apiValue.location && apiValue.location.isDeleted ? null : apiValue.location
      });
    }
  }, {
    key: 'toForm',
    value: function toForm(_ref2) {
      var location = _ref2.location,
          props = _objectWithoutProperties(_ref2, ['location']);

      return _extends({}, props, {
        locationId: location && location.id
      });
    }
  }]);

  return DeviceTranslator;
}(_DefaultTranslator3.default);

exports.default = DeviceTranslator;