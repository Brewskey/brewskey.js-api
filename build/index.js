'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PERMISSIONS_MAP = exports.DAOResult = exports.DAO_ENTITIES = exports.CADENCE_MAP = undefined;

var _odata = require('odata');

var _odata2 = _interopRequireDefault(_odata);

var _constants = require('./constants');

var _DAOResult = require('./dao/DAOResult');

var _DAOResult2 = _interopRequireDefault(_DAOResult);

var _DAO = require('./dao/DAO');

var _DAO2 = _interopRequireDefault(_DAO);

var _ReportTranslator = require('./translators/ReportTranslator');

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _filters = require('./filters');

var _AccountDAO = require('./dao/AccountDAO');

var _AccountDAO2 = _interopRequireDefault(_AccountDAO);

var _AvailabilityDAO = require('./dao/AvailabilityDAO');

var _AvailabilityDAO2 = _interopRequireDefault(_AvailabilityDAO);

var _BeverageDAO = require('./dao/BeverageDAO');

var _BeverageDAO2 = _interopRequireDefault(_BeverageDAO);

var _DeviceDAO = require('./dao/DeviceDAO');

var _DeviceDAO2 = _interopRequireDefault(_DeviceDAO);

var _GlassDAO = require('./dao/GlassDAO');

var _GlassDAO2 = _interopRequireDefault(_GlassDAO);

var _KegDAO = require('./dao/KegDAO');

var _KegDAO2 = _interopRequireDefault(_KegDAO);

var _LocationDAO = require('./dao/LocationDAO');

var _LocationDAO2 = _interopRequireDefault(_LocationDAO);

var _OrganizationDAO = require('./dao/OrganizationDAO');

var _OrganizationDAO2 = _interopRequireDefault(_OrganizationDAO);

var _PermissionDAO = require('./dao/PermissionDAO');

var _PermissionDAO2 = _interopRequireDefault(_PermissionDAO);

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

var setOrganizationID = _DAO2.default.setOrganizationID;

exports.CADENCE_MAP = _ReportTranslator.CADENCE_MAP;
exports.DAO_ENTITIES = _constants.DAO_ENTITIES;
exports.DAOResult = _DAOResult2.default;
exports.PERMISSIONS_MAP = _constants.PERMISSIONS_MAP;

/* eslint-disable sorting/sort-object-props */

exports.default = {
  AccountDAO: _AccountDAO2.default,
  AvailabilityDAO: _AvailabilityDAO2.default,
  BeverageDAO: _BeverageDAO2.default,
  DeviceDAO: _DeviceDAO2.default,
  GlassDAO: _GlassDAO2.default,
  KegDAO: _KegDAO2.default,
  LocationDAO: _LocationDAO2.default,
  OrganizationDAO: _OrganizationDAO2.default,
  PermissionDAO: _PermissionDAO2.default,
  PourChartDAO: _PourChartDAO2.default,
  PourDAO: _PourDAO2.default,
  ReportDAO: _ReportDAO2.default,
  ScheduleDAO: _ScheduleDAO2.default,
  SrmDAO: _SrmDAO2.default,
  StyleDAO: _StyleDAO2.default,
  TapDAO: _TapDAO2.default,
  createFilter: _filters.createFilter,
  doesSatisfyToQueryFilters: _filters.doesSatisfyToQueryFilters,
  fetch: _fetch2.default,
  getHeaders: getHeaders,
  initializeDAOApi: initializeDAOApi,
  setHeaders: setHeaders,
  setOrganizationID: setOrganizationID
};