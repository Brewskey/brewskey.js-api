'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DAO2 = require('./DAO');

var _DAO3 = _interopRequireDefault(_DAO2);

var _constants = require('../constants');

var _DefaultTranslator = require('../translators/DefaultTranslator');

var _DefaultTranslator2 = _interopRequireDefault(_DefaultTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PourChartDAO = function (_DAO) {
  _inherits(PourChartDAO, _DAO);

  function PourChartDAO() {
    _classCallCheck(this, PourChartDAO);

    var _this = _possibleConstructorReturn(this, (PourChartDAO.__proto__ || Object.getPrototypeOf(PourChartDAO)).call(this, {
      entityName: _constants.DAO_ENTITIES.POUR_CHART,
      translator: new _DefaultTranslator2.default()
    }));

    _this.deleteByID = _this.deleteByID.bind(_this);
    _this.count = _this.count.bind(_this);
    _this.fetchByID = _this.fetchByID.bind(_this);
    _this.fetchByIDs = _this.fetchByIDs.bind(_this);
    _this.fetchMany = _this.fetchMany.bind(_this);
    _this.patch = _this.patch.bind(_this);
    _this.post = _this.post.bind(_this);
    _this.put = _this.put.bind(_this);

    _this.fetchChartData = function (params) {
      return _this._resolve(_this._buildHandler(), params, 'post');
    };

    return _this;
  }

  _createClass(PourChartDAO, [{
    key: 'deleteByID',
    value: function deleteByID() {
      throw new Error('The method is not implemented.');
    }
  }, {
    key: 'count',
    value: function count() {
      throw new Error('The method is not implemented.');
    }
  }, {
    key: 'fetchByID',
    value: function fetchByID() {
      throw new Error('The method is not implemented.');
    }
  }, {
    key: 'fetchByIDs',
    value: function fetchByIDs() {
      throw new Error('The method is not implemented.');
    }
  }, {
    key: 'fetchMany',
    value: function fetchMany() {
      throw new Error('The method is not implemented.');
    }
  }, {
    key: 'patch',
    value: function patch() {
      throw new Error('The method is not implemented.');
    }
  }, {
    key: 'post',
    value: function post() {
      throw new Error('The method is not implemented.');
    }
  }, {
    key: 'put',
    value: function put() {
      throw new Error('The method is not implemented.');
    }
  }]);

  return PourChartDAO;
}(_DAO3.default);

exports.default = new PourChartDAO();