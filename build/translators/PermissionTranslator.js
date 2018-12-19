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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PERMISSION_ENTITY_KEYS = ['device', 'location', 'organization', 'tap']; // todo make DAO_ENTITIES and permissionType singular, it will allow
// simplify and reduce many annoying transformations.
// and we won't need to write shitty methods like this. :/

var getPermissionEntityTypeFromModel = function getPermissionEntityTypeFromModel(model) {
  return "".concat((Object.entries(model).find(function (entry) {
    var key = entry[0];
    var value = entry[1];
    return PERMISSION_ENTITY_KEYS.includes(key) && !!value;
  }) || {})[0], "s");
};

var PermissionTranslator =
/*#__PURE__*/
function (_DefaultTranslator) {
  _inherits(PermissionTranslator, _DefaultTranslator);

  function PermissionTranslator() {
    _classCallCheck(this, PermissionTranslator);

    return _possibleConstructorReturn(this, _getPrototypeOf(PermissionTranslator).apply(this, arguments));
  }

  _createClass(PermissionTranslator, [{
    key: "toApi",
    value: function toApi(_ref) {
      var entityId = _ref.entityId,
          entityType = _ref.entityType,
          user = _ref.user,
          organization = _ref.organization,
          props = _objectWithoutProperties(_ref, ["entityId", "entityType", "user", "organization"]);

      return _objectSpread({}, props, {
        deviceId: entityType === 'devices' ? entityId : null,
        locationId: entityType === 'locations' ? entityId : null,
        organizationId: entityType === 'organizations' ? entityId : null,
        tapId: entityType === 'taps' ? entityId : null
      });
    }
  }, {
    key: "toForm",
    value: function toForm(model) {
      var permissionEntityType = getPermissionEntityTypeFromModel(model);
      return _objectSpread({}, model, {
        entityId: model[permissionEntityType.slice(0, -1)],
        entityType: permissionEntityType,
        userId: model.forUser.id
      });
    }
  }]);

  return PermissionTranslator;
}(_DefaultTranslator2.default);

var _default = PermissionTranslator;
exports.default = _default;