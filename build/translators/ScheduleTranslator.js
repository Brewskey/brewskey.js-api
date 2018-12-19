"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DefaultTranslator2 = _interopRequireDefault(require("./DefaultTranslator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SCHEDULE_DAY_BIT_MAP = {
  All: 127,
  Friday: 16,
  Monday: 1,
  None: 0,
  Saturday: 32,
  Sunday: 64,
  Thursday: 8,
  Tuesday: 2,
  Wednesday: 4,
  WeekDays: 31
};

var getCombinedFlag = function getCombinedFlag(days) {
  return days.reduce(function (total, day) {
    return total | SCHEDULE_DAY_BIT_MAP[day];
  }, // eslint-disable-line
  0);
}; // todo clean translator when we will implement schedules in mobile app


var SchedulesTranslator =
/*#__PURE__*/
function (_DefaultTranslator) {
  _inherits(SchedulesTranslator, _DefaultTranslator);

  function SchedulesTranslator() {
    _classCallCheck(this, SchedulesTranslator);

    return _possibleConstructorReturn(this, _getPrototypeOf(SchedulesTranslator).apply(this, arguments));
  }

  _createClass(SchedulesTranslator, [{
    key: "fromApi",
    value: function fromApi(apiValue) {
      return _objectSpread({}, _get(_getPrototypeOf(SchedulesTranslator.prototype), "fromApi", this).call(this, apiValue), {
        days: getCombinedFlag(apiValue.days.split(', ')),
        location: apiValue.location.isDeleted ? null : apiValue.location
      });
    }
  }, {
    key: "toApi",
    value: function toApi(mutator) {
      return _objectSpread({}, mutator, {
        accountIds: mutator.accounts && mutator.accounts.map(function (_ref) {
          var id = _ref.id;
          return id;
        })
      });
    }
  }, {
    key: "toForm",
    value: function toForm(model) {
      return _objectSpread({}, model, {
        locationId: model.location ? model.location.id.toString() : null
      });
    }
  }]);

  return SchedulesTranslator;
}(_DefaultTranslator2.default);

var _default = SchedulesTranslator;
exports.default = _default;