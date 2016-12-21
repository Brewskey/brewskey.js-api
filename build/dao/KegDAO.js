'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DefaultTranslator = require('../translators/DefaultTranslator');

var _DefaultTranslator2 = _interopRequireDefault(_DefaultTranslator);

var _DAO2 = require('./DAO');

var _DAO3 = _interopRequireDefault(_DAO2);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KegDAO = function (_DAO) {
  _inherits(KegDAO, _DAO);

  function KegDAO() {
    _classCallCheck(this, KegDAO);

    return _possibleConstructorReturn(this, (KegDAO.__proto__ || Object.getPrototypeOf(KegDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.KEGS,
      navigationProperties: {
        location: ['id', 'name'],
        tap: ['id', 'name']
      },
      translator: new _DefaultTranslator2.default()
    }));
  }

  _createClass(KegDAO, [{
    key: 'fetchKegByTapID',
    value: function fetchKegByTapID(tapId) {
      var idFilter = {
        operator: _constants.FILTER_OPERATORS.EQUALS,
        params: ['tap/id'],
        values: [tapId]
      };

      var queryOptions = {
        filters: [idFilter],
        orderBy: [{
          column: 'tapDate',
          direction: 'desc'
        }],
        take: 1
      };

      return this.__query(_constants.DAO_ACTIONS.FETCH_KEG_BY_TAP_ID, queryOptions);
    }
  }]);

  return KegDAO;
}(_DAO3.default);

exports.default = new KegDAO();