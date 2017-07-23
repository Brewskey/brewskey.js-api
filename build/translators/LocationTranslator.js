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

var FLOAT_REGEXP = /[+-]?([0-9]*[.])?[0-9]+/g;

var parseLocationCoordinates = function parseLocationCoordinates(wellKnownText) {
  var matchedLatLongStringArray = wellKnownText.match(FLOAT_REGEXP);
  if (!matchedLatLongStringArray) {
    return { latitude: 0, longitude: 0 };
  }
  var latLongNumberArray = matchedLatLongStringArray.map(function (coordinateString) {
    return parseFloat(coordinateString);
  });

  return {
    latitude: latLongNumberArray[1],
    longitude: latLongNumberArray[0]
  };
};

var LocationTranslator = function (_DefaultTranslator) {
  _inherits(LocationTranslator, _DefaultTranslator);

  function LocationTranslator() {
    _classCallCheck(this, LocationTranslator);

    return _possibleConstructorReturn(this, (LocationTranslator.__proto__ || Object.getPrototypeOf(LocationTranslator)).apply(this, arguments));
  }

  _createClass(LocationTranslator, [{
    key: 'fromApi',
    value: function fromApi(apiValue) {
      return _extends({}, _get(LocationTranslator.prototype.__proto__ || Object.getPrototypeOf(LocationTranslator.prototype), 'fromApi', this).call(this, apiValue), {
        geolocation: apiValue.geolocation && _extends({}, apiValue.geolocation, {
          coordinates: parseLocationCoordinates(apiValue.geolocation.geography.wellKnownText)
        })
      });
    }
  }, {
    key: 'toApi',
    value: function toApi(_ref) {
      var organization = _ref.organization,
          props = _objectWithoutProperties(_ref, ['organization']);

      return _extends({}, props, {
        organizationId: organization.id
      });
    }
  }]);

  return LocationTranslator;
}(_DefaultTranslator3.default);

exports.default = LocationTranslator;