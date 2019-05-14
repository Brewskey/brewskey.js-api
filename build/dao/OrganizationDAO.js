"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ODataDAO2 = _interopRequireDefault(require("./ODataDAO"));

var _constants = require("../constants");

var _DefaultTranslator = _interopRequireDefault(require("../translators/DefaultTranslator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OrganizationDAO =
/*#__PURE__*/
function (_ODataDAO) {
  _inherits(OrganizationDAO, _ODataDAO);

  function OrganizationDAO() {
    _classCallCheck(this, OrganizationDAO);

    return _possibleConstructorReturn(this, _getPrototypeOf(OrganizationDAO).call(this, {
      entityName: _constants.DAO_ENTITIES.ORGANIZATIONS,
      translator: new _DefaultTranslator.default()
    }));
  }

  _createClass(OrganizationDAO, [{
    key: "fetchWithPayments",
    value: function fetchWithPayments(queryOptions) {
      var funcString = "Default.withPayments()";

      var handler = this.__buildHandler(queryOptions, false);

      handler.func(funcString);
      return this.__fetchCustom(handler, queryOptions, funcString);
    }
  }, {
    key: "fetchCatalogItems",
    value: function fetchCatalogItems(organizationID, deviceID, queryOptions) {
      var paramString = deviceID != null ? "deviceID=".concat(deviceID) : '';
      var funcString = "Default.getCatalogItems(".concat(paramString, ")");
      var stringifiedID = organizationID.toString();

      var handler = this.__buildHandler(queryOptions, false).find(this.__reformatIDValue(stringifiedID));

      handler.func(funcString);
      return this.__fetchCustom(handler, queryOptions, funcString);
    }
  }, {
    key: "deauthorizeOAuthIntegration",
    value: function deauthorizeOAuthIntegration(organizationID) {
      var partner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Square';
      var funcString = 'Default.deauthorizeOAuthIntegration()';
      var stringifiedID = organizationID.toString();

      var handler = this.__buildHandler({}, false).find(this.__reformatIDValue(stringifiedID)).func(funcString);

      return this.__mutateCustom(handler, 'post', stringifiedID, {
        partner: partner
      });
    }
  }]);

  return OrganizationDAO;
}(_ODataDAO2.default);

var _default = new OrganizationDAO();

exports.default = _default;