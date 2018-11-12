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

var ProductFirmwareDAO = function (_RestDAO) {
  _inherits(ProductFirmwareDAO, _RestDAO);

  function ProductFirmwareDAO() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProductFirmwareDAO);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProductFirmwareDAO.__proto__ || Object.getPrototypeOf(ProductFirmwareDAO)).call.apply(_ref, [this].concat(args))), _this), _this.fetchMany = _this.fetchMany.bind(_this), _this.post = _this.post.bind(_this), _this.updateProductFirmware = _this.updateProductFirmware.bind(_this), _this.delete = _this.delete.bind(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProductFirmwareDAO, [{
    key: 'fetchMany',
    value: function fetchMany(productIdOrSlug) {
      return this.__fetchMany('products/' + productIdOrSlug + '/firmware/');
    }
  }, {
    key: 'post',
    value: function post(productIdOrSlug, mutator) {
      var formData = new FormData();
      formData.append('binary', mutator.binary);
      formData.append('current', false);
      formData.append('description', mutator.description);
      formData.append('title', mutator.title);
      formData.append('version', mutator.version);

      return this.__post('products/' + productIdOrSlug + '/firmware/', mutator, {
        body: formData,
        headers: [{
          name: 'Content-Type',
          value: 'multipart/form-data'
        }],
        method: 'POST'
      });
    }

    // todo this probably wrong  ^.^, i think it basically should be used
    // as `release` product firmware, but why do we need to complex
    // arguments here then...

  }, {
    key: 'updateProductFirmware',
    value: function updateProductFirmware(productIdOrSlug, firmwareId, firmwareVersion, mutator) {
      return this.__put('products/' + productIdOrSlug + '/firmware/' + firmwareVersion, firmwareId, mutator);
    }
  }, {
    key: 'delete',
    value: function _delete(productIdOrSlug, firmwareId) {
      return this.__delete('products/' + productIdOrSlug + '/firmware/' + firmwareId + '/', firmwareId);
    }
  }]);

  return ProductFirmwareDAO;
}(_RestDAO3.default);

exports.default = ProductFirmwareDAO;