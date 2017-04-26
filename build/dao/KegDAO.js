'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DAO2 = require('./DAO');

var _DAO3 = _interopRequireDefault(_DAO2);

var _KegTranslator = require('../translators/KegTranslator');

var _KegTranslator2 = _interopRequireDefault(_KegTranslator);

var _constants = require('../constants');

var _filters = require('../filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KegDAO = function (_DAO) {
  _inherits(KegDAO, _DAO);

  function KegDAO() {
    _classCallCheck(this, KegDAO);

    var _this = _possibleConstructorReturn(this, (KegDAO.__proto__ || Object.getPrototypeOf(KegDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.KEGS,
      navigationProperties: {
        location: ['id', 'isDeleted', 'name'],
        tap: ['id', 'isDeleted', 'name']
      },
      translator: new _KegTranslator2.default()
    }));

    _this.fetchKegByTapID = function (tapId) {
      return _this._resolve(_this._buildHandler({
        filters: [(0, _filters.createFilter)('tap/id').equals(tapId)],
        orderBy: [{
          column: 'tapDate',
          direction: 'desc'
        }],
        take: 1
      }));
    };

    return _this;
  }

  return KegDAO;
}(_DAO3.default);

exports.default = new KegDAO();