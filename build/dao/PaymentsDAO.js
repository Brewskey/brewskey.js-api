"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _RestDAO2 = _interopRequireDefault(require("./RestDAO"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PaymentsDAO = /*#__PURE__*/function (_RestDAO) {
  _inherits(PaymentsDAO, _RestDAO);

  var _super = _createSuper(PaymentsDAO);

  function PaymentsDAO() {
    _classCallCheck(this, PaymentsDAO);

    return _super.call(this, {
      entityName: 'payments'
    });
  }

  _createClass(PaymentsDAO, [{
    key: "get",
    value: function get() {
      return this.__getOne("api/v2/payments/", 'mine', {
        reformatError: function reformatError(error) {
          return error.error;
        }
      });
    } // Only FinancialAdministrator can call this

  }, {
    key: "getOneForAccount",
    value: function getOneForAccount(userName) {
      return this.__getOne("api/v2/payments/".concat(userName, "/"), userName, {
        reformatError: function reformatError(error) {
          return error.error;
        }
      });
    }
  }, {
    key: "addPaymentMethod",
    value: function addPaymentMethod(token) {
      return this.__put("api/v2/payments/", 'mine', {
        token: token
      });
    }
  }, {
    key: "removePaymentMethod",
    value: function removePaymentMethod() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mine';
      return this.__delete('api/v2/payments/', id);
    }
  }]);

  return PaymentsDAO;
}(_RestDAO2["default"]);

var _default = new PaymentsDAO();

exports["default"] = _default;