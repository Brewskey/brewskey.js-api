"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
    return _LoadObject["default"];
  }
});
Object.defineProperty(exports, "ODataDAO", {
  enumerable: true,
  get: function get() {
    return _ODataDAO["default"];
  }
});
Object.defineProperty(exports, "RestDAO", {
  enumerable: true,
  get: function get() {
    return _RestDAO["default"];
  }
});
exports["default"] = void 0;
var _odata = _interopRequireDefault(require("odata"));
var _ReportTranslator = require("./translators/ReportTranslator");
var _Subscription = _interopRequireDefault(require("./dao/Subscription"));
var _fetch = _interopRequireDefault(require("./fetch"));
var _filters = require("./filters");
var _StandardHeaders = _interopRequireDefault(require("./StandardHeaders"));
var _Auth = _interopRequireWildcard(require("./Auth"));
Object.keys(_Auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Auth[key];
    }
  });
});
var _AccountDAO = _interopRequireWildcard(require("./dao/AccountDAO"));
Object.keys(_AccountDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _AccountDAO[key]) return;
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
  if (key in exports && exports[key] === _AchievementDAO[key]) return;
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
  if (key in exports && exports[key] === _AvailabilityDAO[key]) return;
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
  if (key in exports && exports[key] === _BeverageDAO[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BeverageDAO[key];
    }
  });
});
var _CloudDeviceDAO = _interopRequireWildcard(require("./dao/CloudDeviceDAO"));
Object.keys(_CloudDeviceDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CloudDeviceDAO[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CloudDeviceDAO[key];
    }
  });
});
var _DeviceDAO = _interopRequireWildcard(require("./dao/DeviceDAO"));
Object.keys(_DeviceDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DeviceDAO[key]) return;
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
  if (key in exports && exports[key] === _FlowSensorDAO[key]) return;
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
  if (key in exports && exports[key] === _FriendDAO[key]) return;
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
  if (key in exports && exports[key] === _GlassDAO[key]) return;
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
  if (key in exports && exports[key] === _KegDAO[key]) return;
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
  if (key in exports && exports[key] === _LocationDAO[key]) return;
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
  if (key in exports && exports[key] === _OrganizationDAO[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OrganizationDAO[key];
    }
  });
});
var _PaymentsDAO = _interopRequireWildcard(require("./dao/PaymentsDAO"));
Object.keys(_PaymentsDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _PaymentsDAO[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PaymentsDAO[key];
    }
  });
});
var _PermissionDAO = _interopRequireWildcard(require("./dao/PermissionDAO"));
Object.keys(_PermissionDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _PermissionDAO[key]) return;
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
  if (key in exports && exports[key] === _PourChartDAO[key]) return;
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
  if (key in exports && exports[key] === _PourDAO[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PourDAO[key];
    }
  });
});
var _PriceVariantDAO = _interopRequireWildcard(require("./dao/PriceVariantDAO"));
Object.keys(_PriceVariantDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _PriceVariantDAO[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PriceVariantDAO[key];
    }
  });
});
var _ProductDAO = _interopRequireWildcard(require("./dao/ProductDAO"));
Object.keys(_ProductDAO).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ProductDAO[key]) return;
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
  if (key in exports && exports[key] === _ProductDeviceDAO[key]) return;
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
  if (key in exports && exports[key] === _ProductFirmwareDAO[key]) return;
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
  if (key in exports && exports[key] === _ReportDAO[key]) return;
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
  if (key in exports && exports[key] === _ScheduleDAO[key]) return;
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
  if (key in exports && exports[key] === _SrmDAO[key]) return;
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
  if (key in exports && exports[key] === _StyleDAO[key]) return;
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
  if (key in exports && exports[key] === _TapDAO[key]) return;
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
  if (key in exports && exports[key] === _CloudSSEManager[key]) return;
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
  if (key in exports && exports[key] === _constants[key]) return;
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
  if (key in exports && exports[key] === _types[key]) return;
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
  if (key in exports && exports[key] === _LoadObject[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LoadObject[key];
    }
  });
});
var _RestDAO = _interopRequireDefault(require("./dao/RestDAO"));
var _ODataDAO = _interopRequireDefault(require("./dao/ODataDAO"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var initialize = function initialize(host) {
  _Config["default"].host = host;
  (0, _odata["default"])().config({
    endpoint: "".concat(host, "/api/v2/")
  });
};
var setToken = function setToken(token) {
  _Config["default"].token = token;
  (0, _odata["default"])().config({
    headers: [].concat(_toConsumableArray(_StandardHeaders["default"]), [{
      name: 'Authorization',
      value: "Bearer ".concat(token)
    }])
  });
};
var DAOArray = [_AccountDAO["default"], _AchievementDAO["default"], _AvailabilityDAO["default"], _BeverageDAO["default"], _CloudDeviceDAO["default"], _DeviceDAO["default"], _FlowSensorDAO["default"], _FriendDAO["default"], _GlassDAO["default"], _KegDAO["default"], _LocationDAO["default"], _OrganizationDAO["default"], _PaymentsDAO["default"], _PermissionDAO["default"], _PourDAO["default"], _PriceVariantDAO["default"], _ProductDAO["default"], _ProductDeviceDAO["default"], _ProductFirmwareDAO["default"], _ReportDAO["default"], _ScheduleDAO["default"], _SrmDAO["default"], _StyleDAO["default"], _TapDAO["default"]];
var flushCache = function flushCache() {
  DAOArray.forEach(function (dao) {
    dao.flushCache();
    dao.flushCustomCache();
  });
};
var setOrganizationID = function setOrganizationID(organizationID) {
  _Config["default"].organizationId = organizationID;
  _AccountDAO["default"].flushCache();
  _AchievementDAO["default"].flushCache();
  _BeverageDAO["default"].flushCache();
  _DeviceDAO["default"].flushCache();
  _FriendDAO["default"].flushCache();
  _KegDAO["default"].flushCache();
  _LocationDAO["default"].flushCache();
  _PaymentsDAO["default"].flushCache();
  _PourChartDAO["default"].flushCache();
  _PourDAO["default"].flushCache();
  _PriceVariantDAO["default"].flushCache();
  _ReportDAO["default"].flushCache();
  _ScheduleDAO["default"].flushCache();
  _TapDAO["default"].flushCache();
};
/* eslint-disable sorting/sort-object-props */
var _default = exports["default"] = {
  AccountDAO: _AccountDAO["default"],
  AchievementDAO: _AchievementDAO["default"],
  Auth: _Auth["default"],
  AvailabilityDAO: _AvailabilityDAO["default"],
  BeverageDAO: _BeverageDAO["default"],
  CloudDeviceDAO: _CloudDeviceDAO["default"],
  CloudSSEManager: _CloudSSEManager["default"],
  DeviceDAO: _DeviceDAO["default"],
  FlowSensorDAO: _FlowSensorDAO["default"],
  FriendDAO: _FriendDAO["default"],
  GlassDAO: _GlassDAO["default"],
  KegDAO: _KegDAO["default"],
  LocationDAO: _LocationDAO["default"],
  OrganizationDAO: _OrganizationDAO["default"],
  PaymentsDAO: _PaymentsDAO["default"],
  PermissionDAO: _PermissionDAO["default"],
  PourChartDAO: _PourChartDAO["default"],
  PourDAO: _PourDAO["default"],
  PriceVariantDAO: _PriceVariantDAO["default"],
  ProductDAO: _ProductDAO["default"],
  ProductDeviceDAO: _ProductDeviceDAO["default"],
  ProductFirmwareDAO: _ProductFirmwareDAO["default"],
  ReportDAO: _ReportDAO["default"],
  ScheduleDAO: _ScheduleDAO["default"],
  Signalr: _signalr["default"],
  SrmDAO: _SrmDAO["default"],
  StyleDAO: _StyleDAO["default"],
  TapDAO: _TapDAO["default"],
  createFilter: _filters.createFilter,
  doesSatisfyQueryFilters: _filters.doesSatisfyQueryFilters,
  fetch: _fetch["default"],
  flushCache: flushCache,
  initialize: initialize,
  onError: _Subscription["default"].onError,
  setOrganizationID: setOrganizationID,
  setToken: setToken
};