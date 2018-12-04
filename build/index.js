"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CADENCE_MAP: true,
  LoadObject: true,
  RestDAO: true,
  ODataDAO: true
};
Object.defineProperty(exports, "CADENCE_MAP", {
  enumerable: true,
  get: function get() {
    return _ReportTranslator.CADENCE_MAP;
  }
});
Object.defineProperty(exports, "LoadObject", {
  enumerable: true,
  get: function get() {
    return _LoadObject.default;
  }
});
Object.defineProperty(exports, "RestDAO", {
  enumerable: true,
  get: function get() {
    return _RestDAO.default;
  }
});
Object.defineProperty(exports, "ODataDAO", {
  enumerable: true,
  get: function get() {
    return _ODataDAO.default;
  }
});
exports.default = void 0;

var _odata = _interopRequireDefault(require("odata"));

var _BaseODataDAO = _interopRequireDefault(require("./dao/BaseODataDAO"));

var _ReportTranslator = require("./translators/ReportTranslator");

var _Subscription = _interopRequireDefault(require("./dao/Subscription"));

var _fetch = _interopRequireDefault(require("./fetch"));

var _filters = require("./filters");

var _AccountDAO = _interopRequireWildcard(require("./dao/AccountDAO"));

Object.keys(_AccountDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AccountDAO[key];
    }
  });
});

var _AchievementDAO = _interopRequireWildcard(require("./dao/AchievementDAO"));

Object.keys(_AchievementDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AchievementDAO[key];
    }
  });
});

var _AvailabilityDAO = _interopRequireWildcard(require("./dao/AvailabilityDAO"));

Object.keys(_AvailabilityDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AvailabilityDAO[key];
    }
  });
});

var _BeverageDAO = _interopRequireWildcard(require("./dao/BeverageDAO"));

Object.keys(_BeverageDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BeverageDAO[key];
    }
  });
});

var _CloudDeviceDAO = _interopRequireDefault(require("./dao/CloudDeviceDAO"));

var _CloudDevicePingDAO = _interopRequireWildcard(require("./dao/CloudDevicePingDAO"));

Object.keys(_CloudDevicePingDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CloudDevicePingDAO[key];
    }
  });
});

var _DeviceDAO = _interopRequireWildcard(require("./dao/DeviceDAO"));

Object.keys(_DeviceDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DeviceDAO[key];
    }
  });
});

var _FlowSensorDAO = _interopRequireWildcard(require("./dao/FlowSensorDAO"));

Object.keys(_FlowSensorDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FlowSensorDAO[key];
    }
  });
});

var _FriendDAO = _interopRequireWildcard(require("./dao/FriendDAO"));

Object.keys(_FriendDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FriendDAO[key];
    }
  });
});

var _GlassDAO = _interopRequireWildcard(require("./dao/GlassDAO"));

Object.keys(_GlassDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GlassDAO[key];
    }
  });
});

var _KegDAO = _interopRequireWildcard(require("./dao/KegDAO"));

Object.keys(_KegDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _KegDAO[key];
    }
  });
});

var _LocationDAO = _interopRequireWildcard(require("./dao/LocationDAO"));

Object.keys(_LocationDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LocationDAO[key];
    }
  });
});

var _OrganizationDAO = _interopRequireWildcard(require("./dao/OrganizationDAO"));

Object.keys(_OrganizationDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OrganizationDAO[key];
    }
  });
});

var _PermissionDAO = _interopRequireWildcard(require("./dao/PermissionDAO"));

Object.keys(_PermissionDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PermissionDAO[key];
    }
  });
});

var _PourChartDAO = _interopRequireWildcard(require("./dao/PourChartDAO"));

Object.keys(_PourChartDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PourChartDAO[key];
    }
  });
});

var _PourDAO = _interopRequireWildcard(require("./dao/PourDAO"));

Object.keys(_PourDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PourDAO[key];
    }
  });
});

var _ProductDAO = _interopRequireWildcard(require("./dao/ProductDAO"));

Object.keys(_ProductDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ProductDAO[key];
    }
  });
});

var _ProductDeviceDAO = _interopRequireWildcard(require("./dao/ProductDeviceDAO"));

Object.keys(_ProductDeviceDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ProductDeviceDAO[key];
    }
  });
});

var _ProductFirmwareDAO = _interopRequireWildcard(require("./dao/ProductFirmwareDAO"));

Object.keys(_ProductFirmwareDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ProductFirmwareDAO[key];
    }
  });
});

var _ReportDAO = _interopRequireWildcard(require("./dao/ReportDAO"));

Object.keys(_ReportDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ReportDAO[key];
    }
  });
});

var _ScheduleDAO = _interopRequireWildcard(require("./dao/ScheduleDAO"));

Object.keys(_ScheduleDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ScheduleDAO[key];
    }
  });
});

var _SrmDAO = _interopRequireWildcard(require("./dao/SrmDAO"));

Object.keys(_SrmDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SrmDAO[key];
    }
  });
});

var _StyleDAO = _interopRequireWildcard(require("./dao/StyleDAO"));

Object.keys(_StyleDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _StyleDAO[key];
    }
  });
});

var _TapDAO = _interopRequireWildcard(require("./dao/TapDAO"));

Object.keys(_TapDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TapDAO[key];
    }
  });
});

var _signalr = _interopRequireDefault(require("./signalr"));

var _Config = _interopRequireDefault(require("./Config"));

var _CloudSSEManager = _interopRequireWildcard(require("./CloudSSEManager"));

Object.keys(_CloudSSEManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CloudSSEManager[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _LoadObject = _interopRequireWildcard(require("./LoadObject"));

Object.keys(_LoadObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LoadObject[key];
    }
  });
});

var _RestDAO = _interopRequireDefault(require("./dao/RestDAO"));

var _ODataDAO = _interopRequireDefault(require("./dao/ODataDAO"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialize = function initialize(host) {
  _Config.default.host = host;
  (0, _odata.default)().config({
    endpoint: "".concat(host, "api/v2/")
  });
};

var setToken = function setToken(token) {
  _Config.default.token = token;
  (0, _odata.default)().config({
    headers: [{
      name: 'timezoneOffset',
      value: new Date().getTimezoneOffset().toString()
    }, {
      name: 'Authorization',
      value: "Bearer ".concat(token)
    }, {
      name: 'Prefer',
      value: 'return=representation'
    }]
  });
};

var DAOArray = [_AccountDAO.default, _AchievementDAO.default, _AvailabilityDAO.default, _BeverageDAO.default, _CloudDeviceDAO.default, _CloudDevicePingDAO.default, _DeviceDAO.default, _FlowSensorDAO.default, _FriendDAO.default, _GlassDAO.default, _KegDAO.default, _LocationDAO.default, _OrganizationDAO.default, _PermissionDAO.default, _PourDAO.default, _ProductDAO.default, _ProductDeviceDAO.default, _ProductFirmwareDAO.default, _ReportDAO.default, _ScheduleDAO.default, _SrmDAO.default, _StyleDAO.default, _TapDAO.default];

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
  CloudDeviceDAO: _CloudDeviceDAO.default,
  CloudDevicePingDAO: _CloudDevicePingDAO.default,
  CloudSSEManager: _CloudSSEManager.default,
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
  ProductDAO: _ProductDAO.default,
  ProductDeviceDAO: _ProductDeviceDAO.default,
  ProductFirmwareDAO: _ProductFirmwareDAO.default,
  ReportDAO: _ReportDAO.default,
  ScheduleDAO: _ScheduleDAO.default,
  Signalr: _signalr.default,
  SrmDAO: _SrmDAO.default,
  StyleDAO: _StyleDAO.default,
  TapDAO: _TapDAO.default,
  createFilter: _filters.createFilter,
  doesSatisfyQueryFilters: _filters.doesSatisfyQueryFilters,
  fetch: _fetch.default,
  flushCache: flushCache,
  initialize: initialize,
  onError: _Subscription.default.onError,
  setOrganizationID: setOrganizationID,
  setToken: setToken
};
exports.default = _default;