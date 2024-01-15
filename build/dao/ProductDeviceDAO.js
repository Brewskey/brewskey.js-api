"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RestDAO2 = _interopRequireDefault(require("./RestDAO"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var ProductDeviceDAO = /*#__PURE__*/function (_RestDAO) {
  _inherits(ProductDeviceDAO, _RestDAO);
  function ProductDeviceDAO() {
    _classCallCheck(this, ProductDeviceDAO);
    return _callSuper(this, ProductDeviceDAO, [{
      entityName: 'product-devices'
    }]);
  }
  _createClass(ProductDeviceDAO, [{
    key: "count",
    value: function count(productIdOrSlug) {
      return this.__count("api/v2/products/".concat(productIdOrSlug, "/devices/count"));
    }
  }, {
    key: "getMany",
    value: function getMany(productIdOrSlug) {
      var queryOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var skip = queryOptions.skip,
        take = queryOptions.take;
      return this.__getMany("api/v2/products/".concat(productIdOrSlug, "/devices/?skip=").concat(skip, "&take=").concat(take));
    }
  }, {
    key: "getOne",
    value: function getOne(productIdOrSlug, particleId) {
      return this.__getOne("api/v2/products/".concat(productIdOrSlug, "/devices/").concat(particleId, "/"), particleId);
    }
  }, {
    key: "addToProduct",
    value: function addToProduct(productIdOrSlug, payload) {
      var file = payload.file,
        particleId = payload.particleId;
      return this.__fetchOne("api/v2/products/".concat(productIdOrSlug, "/devices/"), {
        body: JSON.stringify({
          file: file,
          importMethod: file ? 'many' : 'one',
          particleId: particleId
        }),
        headers: [{
          name: 'Accept',
          value: 'application/json'
        }, {
          name: 'Content-Type',
          value: 'application/json'
        }],
        method: 'POST',
        reformatError: function reformatError(error) {
          return "invalid device ids: ".concat(error.invalidDeviceIds.join(', '));
        }
      });
    }
  }, {
    key: "put",
    value: function put(productIdOrSlug, particleId, deviceMutator) {
      return this.__put("api/v2/products/".concat(productIdOrSlug, "/devices/").concat(particleId, "/"), particleId, deviceMutator);
    }
  }, {
    key: "delete",
    value: function _delete(productIdOrSlug, particleId) {
      return this.__delete("api/v2/products/".concat(productIdOrSlug, "/devices/").concat(particleId), particleId);
    }
  }]);
  return ProductDeviceDAO;
}(_RestDAO2["default"]);
var _default = exports["default"] = new ProductDeviceDAO();