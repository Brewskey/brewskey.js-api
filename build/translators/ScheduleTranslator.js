"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DefaultTranslator2 = _interopRequireDefault(require("./DefaultTranslator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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


var SchedulesTranslator = /*#__PURE__*/function (_DefaultTranslator) {
  _inherits(SchedulesTranslator, _DefaultTranslator);

  var _super = _createSuper(SchedulesTranslator);

  function SchedulesTranslator() {
    _classCallCheck(this, SchedulesTranslator);

    return _super.apply(this, arguments);
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
    value: function toForm(_ref2) {
      var accounts = _ref2.accounts,
          days = _ref2.days,
          endTime = _ref2.endTime,
          id = _ref2.id,
          location = _ref2.location,
          name = _ref2.name,
          startTime = _ref2.startTime;
      return {
        accounts: accounts,
        days: days,
        endTime: endTime,
        id: id,
        locationId: location ? location.id.toString() : null,
        name: name,
        startTime: startTime
      };
    }
  }]);

  return SchedulesTranslator;
}(_DefaultTranslator2["default"]);

var _default = SchedulesTranslator;
exports["default"] = _default;