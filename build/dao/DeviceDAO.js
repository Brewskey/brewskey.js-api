'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ODataDAO2 = require('./ODataDAO');

var _ODataDAO3 = _interopRequireDefault(_ODataDAO2);

var _constants = require('../constants');

var _DeviceTranslator = require('../translators/DeviceTranslator');

var _DeviceTranslator2 = _interopRequireDefault(_DeviceTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeviceDAO = function (_ODataDAO) {
  _inherits(DeviceDAO, _ODataDAO);

  function DeviceDAO() {
    _classCallCheck(this, DeviceDAO);

    var _this = _possibleConstructorReturn(this, (DeviceDAO.__proto__ || Object.getPrototypeOf(DeviceDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.DEVICES,
      navigationProperties: {
        createdBy: { select: ['id', 'userName'] },
        lastEditedBy: { select: ['id', 'userName'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] }
      },
      translator: new _DeviceTranslator2.default()
    }));

    _this.fetchParticleAttributes = _this.fetchParticleAttributes.bind(_this);
    return _this;
  }

  _createClass(DeviceDAO, [{
    key: 'fetchParticleAttributes',
    value: function fetchParticleAttributes(deviceID) {
      var funcString = 'Default.particleAttributes()';
      var stringifiedID = deviceID.toString();

      var handler = this.__buildHandler({}, false).find(this.__reformatIDValue(stringifiedID));
      handler.func(funcString);

      return this.__fetchCustom(handler, {}, '' + funcString + deviceID);
    }
  }]);

  return DeviceDAO;
}(_ODataDAO3.default);

exports.default = new DeviceDAO();