"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ODataDAO2 = _interopRequireDefault(require("./ODataDAO"));

var _constants = require("../constants");

var _BeverageTranslator = _interopRequireDefault(require("../translators/BeverageTranslator"));

var _fetch = _interopRequireDefault(require("../fetch"));

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

var BeverageDAO = /*#__PURE__*/function (_ODataDAO) {
  _inherits(BeverageDAO, _ODataDAO);

  var _super = _createSuper(BeverageDAO);

  function BeverageDAO() {
    _classCallCheck(this, BeverageDAO);

    return _super.call(this, {
      entityName: _constants.DAO_ENTITIES.BEVERAGES,
      navigationProperties: {
        availability: {
          select: ['id', 'name']
        },
        createdBy: {
          select: ['id', 'userName']
        },
        glass: {
          select: ['id', 'name']
        },
        srm: {
          select: ['hex', 'id', 'name']
        },
        style: {
          select: ['id', 'name']
        }
      },
      translator: new _BeverageTranslator["default"]()
    });
  }

  _createClass(BeverageDAO, [{
    key: "search",
    value: function search(queryOptions) {
      var funcString = "Default.search()";

      var handler = this.__buildHandler(queryOptions, false);

      handler.func(funcString);
      return this.__fetchCustom(handler, queryOptions, funcString);
    } // todo move to BeverageImageDAO extends RestDAO ?

  }, {
    key: "uploadImage",
    value: function uploadImage(beverageId, image) {
      return (0, _fetch["default"])("api/v2/beverages/".concat(beverageId, "/photo/"), {
        body: JSON.stringify({
          photo: image
        }),
        headers: [{
          name: 'Accept',
          value: 'application/json'
        }, {
          name: 'Content-Type',
          value: 'application/json'
        }],
        method: 'PUT'
      });
    }
  }]);

  return BeverageDAO;
}(_ODataDAO2["default"]);

var _default = new BeverageDAO();

exports["default"] = _default;