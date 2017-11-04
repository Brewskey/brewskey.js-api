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

var PERMISSION_ENTITY_KEYS = ['device', 'location', 'organization', 'tap'];

// todo make DAO_ENTITIES and permissionType singular, it will allow
// simplify and reduce many annoying transformations.
// and we won't need to write shitty methods like this. :/
var getPermissionEntityTypeFromModel = function getPermissionEntityTypeFromModel(model) {
  return (Object.entries(model).find(function (entry) {
    var key = entry[0];
    var value = entry[1];
    return PERMISSION_ENTITY_KEYS.includes(key) && !!value;
  }) || {})[0] + 's';
};

var PermissionTranslator = function (_DefaultTranslator) {
  _inherits(PermissionTranslator, _DefaultTranslator);

  function PermissionTranslator() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PermissionTranslator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PermissionTranslator.__proto__ || Object.getPrototypeOf(PermissionTranslator)).call.apply(_ref, [this].concat(args))), _this), _this.toApi = _this.toApi.bind(_this), _this.toForm = _this.toForm.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PermissionTranslator, [{
    key: 'toApi',
    value: function toApi(_ref2) {
      var entity = _ref2.entity,
          entityType = _ref2.entityType,
          user = _ref2.user,
          organization = _ref2.organization,
          props = _objectWithoutProperties(_ref2, ['entity', 'entityType', 'user', 'organization']);

      return _extends({}, props, {
        deviceId: entityType === 'devices' ? entity.id : null,
        locationId: entityType === 'locations' ? entity.id : null,
        organizationId: entityType === 'organizations' ? entity.id : null,
        tapId: entityType === 'taps' ? entity.id : null,
        userId: user.id
      });
    }
  }, {
    key: 'toForm',
    value: function toForm(model) {
      var permissionEntityType = getPermissionEntityTypeFromModel(model);

      return _extends({}, model, {
        entity: model[permissionEntityType.slice(0, -1)],
        entityType: permissionEntityType,
        user: model.forUser
      });
    }
  }]);

  return PermissionTranslator;
}(_DefaultTranslator3.default);

exports.default = PermissionTranslator;