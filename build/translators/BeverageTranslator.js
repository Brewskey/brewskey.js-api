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

var BeverageTranslator = function (_DefaultTranslator) {
  _inherits(BeverageTranslator, _DefaultTranslator);

  function BeverageTranslator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BeverageTranslator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BeverageTranslator.__proto__ || Object.getPrototypeOf(BeverageTranslator)).call.apply(_ref, [this].concat(args))), _this), _this.fromApi = _this.fromApi.bind(_this), _this.toApi = _this.toApi.bind(_this), _this.toForm = _this.toForm.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BeverageTranslator, [{
    key: 'fromApi',
    value: function fromApi(apiValue) {
      return _extends({}, _get(BeverageTranslator.prototype.__proto__ || Object.getPrototypeOf(BeverageTranslator.prototype), 'fromApi', this).call(this, apiValue), {
        isOrganic: apiValue.isOrganic === 'Y'
      });
    }
  }, {
    key: 'toApi',
    value: function toApi(_ref2) {
      var availability = _ref2.availability,
          glass = _ref2.glass,
          isOrganic = _ref2.isOrganic,
          srm = _ref2.srm,
          style = _ref2.style,
          props = _objectWithoutProperties(_ref2, ['availability', 'glass', 'isOrganic', 'srm', 'style']);

      return _extends({}, props, {
        availabilityId: availability && availability.id,
        glasswareId: glass && glass.id,
        isOrganic: isOrganic ? 'Y' : 'N',
        srmId: srm && srm.id,
        styleId: style && style.id
      });
    }
  }, {
    key: 'toForm',
    value: function toForm(model) {
      return _extends({}, model, {
        locationId: model.location ? model.location.id.toString() : null
      });
    }
  }]);

  return BeverageTranslator;
}(_DefaultTranslator3.default);

exports.default = BeverageTranslator;