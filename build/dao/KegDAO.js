'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_OUNCES_BY_KEG_TYPE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ODataDAO2 = require('./ODataDAO');

var _ODataDAO3 = _interopRequireDefault(_ODataDAO2);

var _KegTranslator = require('../translators/KegTranslator');

var _KegTranslator2 = _interopRequireDefault(_KegTranslator);

var _LoadObject = require('../LoadObject');

var _LoadObject2 = _interopRequireDefault(_LoadObject);

var _constants = require('../constants');

var _filters = require('../filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_OUNCES_BY_KEG_TYPE = exports.MAX_OUNCES_BY_KEG_TYPE = {
  Cornelius: 640,
  HalfBarrel: 1984,
  Mini: 169,
  QuarterBarrel: 992,
  SixthBarrel: 661,
  SlimQuarter: 992
};

var KegDAO = function (_ODataDAO) {
  _inherits(KegDAO, _ODataDAO);

  function KegDAO() {
    _classCallCheck(this, KegDAO);

    var _this = _possibleConstructorReturn(this, (KegDAO.__proto__ || Object.getPrototypeOf(KegDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.KEGS,
      navigationProperties: {
        beverage: { select: ['id', 'isDeleted', 'name'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
        tap: { select: ['id', 'isDeleted'] }
      },
      translator: new _KegTranslator2.default()
    }));

    _this.floatKeg = _this.floatKeg.bind(_this);

    _this.fetchKegByTapID = function (tapId) {
      return _this.fetchMany({
        filters: [(0, _filters.createFilter)('tap/id').equals(tapId)],
        orderBy: [{
          column: 'tapDate',
          direction: 'desc'
        }],
        take: 1
      });
    };

    return _this;
  }

  _createClass(KegDAO, [{
    key: 'floatKeg',
    value: function floatKeg(tapID) {
      var funcString = 'Default.floatKeg()';
      var stringifiedID = tapID.toString();

      var handler = this.__buildHandler({}, false).find(this.__reformatIDValue(stringifiedID)).func(funcString);

      return this.__mutateCustom(handler, 'put', tapID, null);
    }
  }]);

  return KegDAO;
}(_ODataDAO3.default);

exports.default = new KegDAO();