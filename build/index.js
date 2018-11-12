"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DAO_ENTITIES", {
  enumerable: true,
  get: function get() {
    return _constants.DAO_ENTITIES;
  }
});
Object.defineProperty(exports, "PERMISSIONS_MAP", {
  enumerable: true,
  get: function get() {
    return _constants.PERMISSIONS_MAP;
  }
});
Object.defineProperty(exports, "CADENCE_MAP", {
  enumerable: true,
  get: function get() {
    return _ReportTranslator.CADENCE_MAP;
  }
});
Object.defineProperty(exports, "MAX_OUNCES_BY_KEG_TYPE", {
  enumerable: true,
  get: function get() {
    return _KegDAO.MAX_OUNCES_BY_KEG_TYPE;
  }
});
Object.defineProperty(exports, "FRIEND_STATUSES", {
  enumerable: true,
  get: function get() {
    return _FriendDAO.FRIEND_STATUSES;
  }
});
Object.defineProperty(exports, "LoadObject", {
  enumerable: true,
  get: function get() {
    return _LoadObject.default;
  }
});
exports.default = void 0;

var _odata = _interopRequireDefault(require("odata"));

var _constants = require("./constants");

var _BaseODataDAO = _interopRequireDefault(require("./dao/BaseODataDAO"));

var _ReportTranslator = require("./translators/ReportTranslator");

var _KegDAO = _interopRequireWildcard(require("./dao/KegDAO"));

var _FriendDAO = _interopRequireWildcard(require("./dao/FriendDAO"));

var _LoadObject = _interopRequireDefault(require("./LoadObject"));

var _Subcription = _interopRequireDefault(require("./dao/Subcription"));

var _fetch = _interopRequireDefault(require("./fetch"));

var _filters = require("./filters");

var _AccountDAO = _interopRequireDefault(require("./dao/AccountDAO"));

var _AchievementDAO = _interopRequireDefault(require("./dao/AchievementDAO"));

var _AvailabilityDAO = _interopRequireDefault(require("./dao/AvailabilityDAO"));

var _BeverageDAO = _interopRequireDefault(require("./dao/BeverageDAO"));

var _CloudDeviceDAO = _interopRequireDefault(require("./dao/CloudDeviceDAO"));

var _DeviceDAO = _interopRequireDefault(require("./dao/DeviceDAO"));

var _FlowSensorDAO = _interopRequireDefault(require("./dao/FlowSensorDAO"));

var _GlassDAO = _interopRequireDefault(require("./dao/GlassDAO"));

var _LocationDAO = _interopRequireDefault(require("./dao/LocationDAO"));

var _OrganizationDAO = _interopRequireDefault(require("./dao/OrganizationDAO"));

var _PermissionDAO = _interopRequireDefault(require("./dao/PermissionDAO"));

var _PourChartDAO = _interopRequireDefault(require("./dao/PourChartDAO"));

var _PourDAO = _interopRequireDefault(require("./dao/PourDAO"));

var _ProductDAO = _interopRequireDefault(require("./dao/ProductDAO"));

var _ProductDeviceDAO = _interopRequireDefault(require("./dao/ProductDeviceDAO"));

var _ProductFirmwareDAO = _interopRequireDefault(require("./dao/ProductFirmwareDAO"));

var _ReportDAO = _interopRequireDefault(require("./dao/ReportDAO"));

var _ScheduleDAO = _interopRequireDefault(require("./dao/ScheduleDAO"));

var _SrmDAO = _interopRequireDefault(require("./dao/SrmDAO"));

var _StyleDAO = _interopRequireDefault(require("./dao/StyleDAO"));

var _TapDAO = _interopRequireDefault(require("./dao/TapDAO"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var initializeDAOApi = function initializeDAOApi(_ref) {
  var endpoint = _ref.endpoint,
      headers = _ref.headers;
  (0, _odata.default)().config({
    endpoint: endpoint,
    headers: [{
      name: 'Prefer',
      value: 'return=representation'
    }].concat(_toConsumableArray(headers || []))
  });
};

var getHeaders = function getHeaders() {
  return (0, _odata.default)().oConfig.headers || [];
};

var setHeaders = function setHeaders(headers) {
  (0, _odata.default)().config({
    headers: headers
  });
};

var DAOArray = [_AccountDAO.default, _AchievementDAO.default, _AvailabilityDAO.default, _BeverageDAO.default, _DeviceDAO.default, _FlowSensorDAO.default, _FriendDAO.default, _GlassDAO.default, _KegDAO.default, _LocationDAO.default, _OrganizationDAO.default, _PermissionDAO.default, _PourDAO.default, _ReportDAO.default, _ScheduleDAO.default, _SrmDAO.default, _StyleDAO.default, _TapDAO.default];

var flushCache = function flushCache() {
  DAOArray.forEach(function (dao) {
    dao.flushCache();
    dao.flushCustomCache();
  });
};

var setOrganizationID = function setOrganizationID(organizationID) {
  _BaseODataDAO.default.setOrganizationID(organizationID);

  _AccountDAO.default.flushCache();

  _AchievementDAO.default.flushCache();

  _BeverageDAO.default.flushCache();

  _DeviceDAO.default.flushCache();

  _FriendDAO.default.flushCache();

  _KegDAO.default.flushCache();

  _LocationDAO.default.flushCache();

  _PermissionDAO.default.flushCache();

  _PourDAO.default.flushCache();

  _ReportDAO.default.flushCache();

  _ScheduleDAO.default.flushCache();

  _TapDAO.default.flushCache();
};

/* eslint-disable sorting/sort-object-props */
var _default = {
  AccountDAO: _AccountDAO.default,
  AchievementDAO: _AchievementDAO.default,
  AvailabilityDAO: _AvailabilityDAO.default,
  BeverageDAO: _BeverageDAO.default,
  ClouDeviceDAO: _CloudDeviceDAO.default,
  DeviceDAO: _DeviceDAO.default,
  FlowSensorDAO: _FlowSensorDAO.default,
  FriendDAO: _FriendDAO.default,
  GlassDAO: _GlassDAO.default,
  KegDAO: _KegDAO.default,
  LocationDAO: _LocationDAO.default,
  OrganizationDAO: _OrganizationDAO.default,
  PermissionDAO: _PermissionDAO.default,
  PourChartDAO: _PourChartDAO.default,
  PourDAO: _PourDAO.default,
  ProductFirmwareDAO: _ProductFirmwareDAO.default,
  ProductDAO: _ProductDAO.default,
  ProductDeviceDAO: _ProductDeviceDAO.default,
  ReportDAO: _ReportDAO.default,
  ScheduleDAO: _ScheduleDAO.default,
  SrmDAO: _SrmDAO.default,
  StyleDAO: _StyleDAO.default,
  TapDAO: _TapDAO.default,
  createFilter: _filters.createFilter,
  doesSatisfyQueryFilters: _filters.doesSatisfyQueryFilters,
  fetch: _fetch.default,
  flushCache: flushCache,
  getHeaders: getHeaders,
  initializeDAOApi: initializeDAOApi,
  onError: _Subcription.default.onError,
  setHeaders: setHeaders,
  setOrganizationID: setOrganizationID
};
exports.default = _default;