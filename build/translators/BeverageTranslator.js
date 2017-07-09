'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    _classCallCheck(this, BeverageTranslator);

    return _possibleConstructorReturn(this, (BeverageTranslator.__proto__ || Object.getPrototypeOf(BeverageTranslator)).apply(this, arguments));
  }

  _createClass(BeverageTranslator, [{
    key: 'toApi',
    value: function toApi(_ref) {
      var availability = _ref.availability,
          glassware = _ref.glassware,
          srm = _ref.srm,
          style = _ref.style,
          props = _objectWithoutProperties(_ref, ['availability', 'glassware', 'srm', 'style']);

      return _extends({}, props, {
        availabilityId: availability && availability.id,
        glasswareId: glassware && glassware.id,
        srmId: srm && srm.id,
        styleId: style && style.id
      });
    }
  }]);

  return BeverageTranslator;
}(_DefaultTranslator3.default);

exports.default = BeverageTranslator;