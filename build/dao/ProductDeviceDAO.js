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

var ProductDeviceDAO = function (_RestDAO) {
  _inherits(ProductDeviceDAO, _RestDAO);

  function ProductDeviceDAO() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProductDeviceDAO);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProductDeviceDAO.__proto__ || Object.getPrototypeOf(ProductDeviceDAO)).call.apply(_ref, [this].concat(args))), _this), _this.fetchMany = _this.fetchMany.bind(_this), _this.fetchOne = _this.fetchOne.bind(_this), _this.post = _this.post.bind(_this), _this.put = _this.put.bind(_this), _this.delete = _this.delete.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProductDeviceDAO, [{
    key: 'fetchMany',
    value: function fetchMany(productIdOrSlug) {
      return this.__fetchMany('products/' + productIdOrSlug + '/devices/');
    }
  }, {
    key: 'fetchOne',
    value: function fetchOne(productIdOrSlug, particleId) {
      return this.__fetchOne('products/' + productIdOrSlug + '/devices/' + particleId + '/', particleId);
    }
  }, {
    key: 'post',
    value: function post(productIdOrSlug, deviceMutator) {
      return this.__post('products/' + productIdOrSlug + '/devices/', deviceMutator);
    }
  }, {
    key: 'put',
    value: function put(productIdOrSlug, particleId, deviceMutator) {
      return this.__put('products/' + productIdOrSlug + '/devices/' + particleId + '/', particleId, deviceMutator);
    }
  }, {
    key: 'delete',
    value: function _delete(productIdOrSlug, particleId) {
      return this.__delete('products/' + productIdOrSlug + '/devices/' + particleId, particleId);
    }
  }]);

  return ProductDeviceDAO;
}(_RestDAO3.default);

exports.default = ProductDeviceDAO;