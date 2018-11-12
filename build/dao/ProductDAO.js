"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RestDAO2 = _interopRequireDefault(require("./RestDAO"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ProductDAO =
/*#__PURE__*/
function (_RestDAO) {
  _inherits(ProductDAO, _RestDAO);

  function ProductDAO() {
    _classCallCheck(this, ProductDAO);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProductDAO).apply(this, arguments));
  }

  _createClass(ProductDAO, [{
    key: "fetchMany",
    value: function fetchMany() {
      return this.__fetchMany('products/');
    }
  }, {
    key: "fetchOne",
    value: function fetchOne(idOrSlug) {
      return this.__fetchOne("products/".concat(idOrSlug, "/"), idOrSlug);
    }
  }, {
    key: "post",
    value: function post(mutator) {
      return this.__post('products/', mutator);
    }
  }, {
    key: "put",
    value: function put(id, mutator) {
      return this.__put("products/".concat(id, "/"), id, mutator);
    }
  }, {
    key: "delete",
    value: function _delete(idOrSlug) {
      return this.__delete("products/".concat(idOrSlug), idOrSlug);
    }
  }]);

  return ProductDAO;
}(_RestDAO2.default);

var _default = new ProductDAO();

exports.default = _default;