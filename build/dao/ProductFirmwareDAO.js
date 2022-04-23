"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _RestDAO2 = _interopRequireDefault(require("./RestDAO"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ProductFirmwareDAO = /*#__PURE__*/function (_RestDAO) {
  _inherits(ProductFirmwareDAO, _RestDAO);

  var _super = _createSuper(ProductFirmwareDAO);

  function ProductFirmwareDAO() {
    _classCallCheck(this, ProductFirmwareDAO);

    return _super.call(this, {
      entityName: 'product-firmwares'
    });
  }

  _createClass(ProductFirmwareDAO, [{
    key: "count",
    value: function count(productIdOrSlug) {
      return this.__count("api/v2/products/".concat(productIdOrSlug, "/firmwares/count"));
    }
  }, {
    key: "getOne",
    value: function getOne(productIdOrSlug, id) {
      return this.__getOne("api/v2/products/".concat(productIdOrSlug, "/firmwares/").concat(id, "/"), id);
    }
  }, {
    key: "getMany",
    value: function getMany(productIdOrSlug) {
      var queryOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var skip = queryOptions.skip,
          take = queryOptions.take;
      return this.__getMany("api/v2/products/".concat(productIdOrSlug, "/firmwares/?skip=").concat(skip, "&take=").concat(take));
    }
  }, {
    key: "post",
    value: function post(productIdOrSlug, mutator) {
      return this.__post("api/v2/products/".concat(productIdOrSlug, "/firmwares/"), mutator, {
        reformatError: function reformatError(error) {
          return error.error;
        }
      });
    }
  }, {
    key: "updateProductFirmware",
    value: function updateProductFirmware(productIdOrSlug, firmwareId, firmwareVersion, mutator) {
      return this.__put("api/v2/products/".concat(productIdOrSlug, "/firmwares/").concat(firmwareVersion), firmwareId, mutator);
    }
  }, {
    key: "delete",
    value: function _delete(productIdOrSlug, firmwareId, firmwareVersion) {
      return this.__delete("api/v2/products/".concat(productIdOrSlug, "/firmwares/").concat(firmwareVersion, "/"), firmwareId);
    }
  }]);

  return ProductFirmwareDAO;
}(_RestDAO2["default"]);

var _default = new ProductFirmwareDAO();

exports["default"] = _default;