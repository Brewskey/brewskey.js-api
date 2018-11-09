'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RestDAO2 = require('./RestDAO');

var _RestDAO3 = _interopRequireDefault(_RestDAO2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductDAO = function (_RestDAO) {
  _inherits(ProductDAO, _RestDAO);

  function ProductDAO() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProductDAO);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProductDAO.__proto__ || Object.getPrototypeOf(ProductDAO)).call.apply(_ref, [this].concat(args))), _this), _this.fetchMany = _this.fetchMany.bind(_this), _this.fetchOne = _this.fetchOne.bind(_this), _this.post = _this.post.bind(_this), _this.put = _this.put.bind(_this), _this.delete = _this.delete.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProductDAO, [{
    key: 'fetchMany',
    value: function fetchMany() {
      return this.__fetchMany('products/');
    }
  }, {
    key: 'fetchOne',
    value: function fetchOne(idOrSlug) {
      return this.__fetchOne('products/' + idOrSlug + '/', idOrSlug);
    }
  }, {
    key: 'post',
    value: function post(mutator) {
      return this.__post('products/', mutator);
    }
  }, {
    key: 'put',
    value: function put(id, mutator) {
      return this.__put('products/' + id + '/', id, mutator);
    }
  }, {
    key: 'delete',
    value: function _delete(idOrSlug) {
      return this.__delete('products/' + idOrSlug, idOrSlug);
    }
  }]);

  return ProductDAO;
}(_RestDAO3.default);

exports.default = new ProductDAO();