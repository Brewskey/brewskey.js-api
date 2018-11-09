'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PERMISSIONS_MAP = exports.MAX_OUNCES_BY_KEG_TYPE = exports.LoadObject = exports.FRIEND_STATUSES = exports.DAO_ENTITIES = exports.CADENCE_MAP = undefined;

var _odata = require('odata');

var _odata2 = _interopRequireDefault(_odata);

var _constants = require('./constants');

var _BaseODataDAO = require('./dao/BaseODataDAO');

var _BaseODataDAO2 = _interopRequireDefault(_BaseODataDAO);

var _ReportTranslator = require('./translators/ReportTranslator');

var _KegDAO = require('./dao/KegDAO');

var _KegDAO2 = _interopRequireDefault(_KegDAO);

var _FriendDAO = require('./dao/FriendDAO');

var _FriendDAO2 = _interopRequireDefault(_FriendDAO);

var _LoadObject = require('./LoadObject');

var _LoadObject2 = _interopRequireDefault(_LoadObject);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _filters = require('./filters');

var _AccountDAO = require('./dao/AccountDAO');

var _AccountDAO2 = _interopRequireDefault(_AccountDAO);

var _AchievementDAO = require('./dao/AchievementDAO');

var _AchievementDAO2 = _interopRequireDefault(_AchievementDAO);

var _AvailabilityDAO = require('./dao/AvailabilityDAO');

var _AvailabilityDAO2 = _interopRequireDefault(_AvailabilityDAO);

var _BeverageDAO = require('./dao/BeverageDAO');

var _BeverageDAO2 = _interopRequireDefault(_BeverageDAO);

var _DeviceDAO = require('./dao/DeviceDAO');

var _DeviceDAO2 = _interopRequireDefault(_DeviceDAO);

var _FlowSensorDAO = require('./dao/FlowSensorDAO');

var _FlowSensorDAO2 = _interopRequireDefault(_FlowSensorDAO);

var _GlassDAO = require('./dao/GlassDAO');

var _GlassDAO2 = _interopRequireDefault(_GlassDAO);

var _LocationDAO = require('./dao/LocationDAO');

var _LocationDAO2 = _interopRequireDefault(_LocationDAO);

var _OrganizationDAO = require('./dao/OrganizationDAO');

var _OrganizationDAO2 = _interopRequireDefault(_OrganizationDAO);

var _PermissionDAO = require('./dao/PermissionDAO');

var _PermissionDAO2 = _interopRequireDefault(_PermissionDAO);

var _ProductDAO = require('./dao/ProductDAO');

var _ProductDAO2 = _interopRequireDefault(_ProductDAO);

var _PourChartDAO = require('./dao/PourChartDAO');

var _PourChartDAO2 = _interopRequireDefault(_PourChartDAO);

var _PourDAO = require('./dao/PourDAO');

var _PourDAO2 = _interopRequireDefault(_PourDAO);

var _ReportDAO = require('./dao/ReportDAO');

var _ReportDAO2 = _interopRequireDefault(_ReportDAO);

var _ScheduleDAO = require('./dao/ScheduleDAO');

var _ScheduleDAO2 = _interopRequireDefault(_ScheduleDAO);

var _SrmDAO = require('./dao/SrmDAO');

var _SrmDAO2 = _interopRequireDefault(_SrmDAO);

var _StyleDAO = require('./dao/StyleDAO');

var _StyleDAO2 = _interopRequireDefault(_StyleDAO);

var _TapDAO = require('./dao/TapDAO');

var _TapDAO2 = _interopRequireDefault(_TapDAO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initializeDAOApi = function initializeDAOApi(_ref) {
  var endpoint = _ref.endpoint,
      headers = _ref.headers;

  (0, _odata2.default)().config({
    endpoint: endpoint,
    headers: [{ name: 'Prefer', value: 'return=representation' }].concat(_toConsumableArray(headers || []))
  });
};

var getHeaders = function getHeaders() {
  return (0, _odata2.default)().oConfig.headers || [];
};

var setHeaders = function setHeaders(headers) {
  (0, _odata2.default)().config({
    headers: headers
  });
};

var DAOArray = [_AccountDAO2.default, _AchievementDAO2.default, _AvailabilityDAO2.default, _BeverageDAO2.default, _DeviceDAO2.default, _FlowSensorDAO2.default, _FriendDAO2.default, _GlassDAO2.default, _KegDAO2.default, _LocationDAO2.default, _OrganizationDAO2.default, _PermissionDAO2.default, _PourDAO2.default, _ReportDAO2.default, _ScheduleDAO2.default, _SrmDAO2.default, _StyleDAO2.default, _TapDAO2.default];

var flushCache = function flushCache() {
  DAOArray.forEach(function (dao) {
    dao.flushCache();
    dao.flushCustomCache();
  });
};

var setOrganizationID = function setOrganizationID(organizationID) {
  _BaseODataDAO2.default.setOrganizationID(organizationID);

  _AccountDAO2.default.flushCache();
  _AchievementDAO2.default.flushCache();
  _BeverageDAO2.default.flushCache();
  _DeviceDAO2.default.flushCache();
  _FriendDAO2.default.flushCache();
  _KegDAO2.default.flushCache();
  _LocationDAO2.default.flushCache();
  _PermissionDAO2.default.flushCache();
  _PourDAO2.default.flushCache();
  _ReportDAO2.default.flushCache();
  _ScheduleDAO2.default.flushCache();
  _TapDAO2.default.flushCache();
};

exports.CADENCE_MAP = _ReportTranslator.CADENCE_MAP;
exports.DAO_ENTITIES = _constants.DAO_ENTITIES;
exports.FRIEND_STATUSES = _FriendDAO.FRIEND_STATUSES;
exports.LoadObject = _LoadObject2.default;
exports.MAX_OUNCES_BY_KEG_TYPE = _KegDAO.MAX_OUNCES_BY_KEG_TYPE;
exports.PERMISSIONS_MAP = _constants.PERMISSIONS_MAP;

/* eslint-disable sorting/sort-object-props */

exports.default = {
  AccountDAO: _AccountDAO2.default,
  AchievementDAO: _AchievementDAO2.default,
  AvailabilityDAO: _AvailabilityDAO2.default,
  BeverageDAO: _BeverageDAO2.default,
  DeviceDAO: _DeviceDAO2.default,
  FlowSensorDAO: _FlowSensorDAO2.default,
  FriendDAO: _FriendDAO2.default,
  GlassDAO: _GlassDAO2.default,
  KegDAO: _KegDAO2.default,
  LocationDAO: _LocationDAO2.default,
  OrganizationDAO: _OrganizationDAO2.default,
  PermissionDAO: _PermissionDAO2.default,
  PourChartDAO: _PourChartDAO2.default,
  PourDAO: _PourDAO2.default,
  ProductDAO: _ProductDAO2.default,
  ReportDAO: _ReportDAO2.default,
  ScheduleDAO: _ScheduleDAO2.default,
  SrmDAO: _SrmDAO2.default,
  StyleDAO: _StyleDAO2.default,
  TapDAO: _TapDAO2.default,
  createFilter: _filters.createFilter,
  doesSatisfyQueryFilters: _filters.doesSatisfyQueryFilters,
  fetch: _fetch2.default,
  flushCache: flushCache,
  getHeaders: getHeaders,
  initializeDAOApi: initializeDAOApi,
  onError: _BaseODataDAO2.default.onError,
  setHeaders: setHeaders,
  setOrganizationID: setOrganizationID
};