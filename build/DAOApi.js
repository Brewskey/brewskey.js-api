'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _odata = require('odata');

var _odata2 = _interopRequireDefault(_odata);

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

var _PermissionDAO = require('./dao/PermissionDAO');

var _PermissionDAO2 = _interopRequireDefault(_PermissionDAO);

var _PourDAO = require('./dao/PourDAO');

var _PourDAO2 = _interopRequireDefault(_PourDAO);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DAOApi = function DAOApi(_ref) {
  var endpoint = _ref.endpoint,
      headers = _ref.headers;

  _classCallCheck(this, DAOApi);

  _initialiseProps.call(this);

  (0, _odata2.default)().config({
    endpoint: endpoint,
    headers: [{ name: 'Prefer', value: 'return=representation' }].concat(_toConsumableArray(headers || []))
  });

  this.AccountDAO = _AccountDAO2.default;
  this.AvailabilityDAO = _AvailabilityDAO2.default;
  this.BeverageDAO = _BeverageDAO2.default;
  this.DeviceDAO = _DeviceDAO2.default;
  this.GlassDAO = _GlassDAO2.default;
  this.KegDAO = _KegDAO2.default;
  this.LocationDAO = _LocationDAO2.default;
  this.PermissionDAO = _PermissionDAO2.default;
  this.PourDAO = _PourDAO2.default;
  this.ScheduleDAO = _ScheduleDAO2.default;
  this.SrmDAO = _SrmDAO2.default;
  this.StyleDAO = _StyleDAO2.default;
  this.TapDAO = _TapDAO2.default;
};

var _initialiseProps = function _initialiseProps() {
  this.getHeaders = function () {
    return (0, _odata2.default)().oConfig.headers || [];
  };

  this.setHeaders = function (headers) {
    (0, _odata2.default)().config({
      headers: headers
    });
  };
};

exports.default = DAOApi;