'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DAO2 = require('./DAO');

var _DAO3 = _interopRequireDefault(_DAO2);

var _constants = require('../constants');

var _PermissionTranslator = require('../translators/PermissionTranslator');

var _PermissionTranslator2 = _interopRequireDefault(_PermissionTranslator);

var _filters = require('../filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PermissionDAO = function (_DAO) {
  _inherits(PermissionDAO, _DAO);

  function PermissionDAO() {
    _classCallCheck(this, PermissionDAO);

    return _possibleConstructorReturn(this, (PermissionDAO.__proto__ || Object.getPrototypeOf(PermissionDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.PERMISSIONS,
      navigationProperties: {
        createdBy: ['id', 'userName'],
        device: ['id', 'name'],
        forUser: ['id', 'userName'],
        location: ['id', 'name'],
        tap: ['id', 'name']
      },
      translator: new _PermissionTranslator2.default()
    }));
  }

  _createClass(PermissionDAO, [{
    key: 'fetchPermissionsByUserID',
    value: function fetchPermissionsByUserID(userID) {
      return this._resolve(this._buildHandler({
        filters: [(0, _filters.createFilter)('forUser/id').equals(userID)]
      }));
    }
  }]);

  return PermissionDAO;
}(_DAO3.default);

exports.default = new PermissionDAO();