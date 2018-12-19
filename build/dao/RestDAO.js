"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nullthrows = _interopRequireDefault(require("nullthrows"));

var _ClientID = _interopRequireDefault(require("./ClientID"));

var _Subscription2 = _interopRequireDefault(require("./Subscription"));

var _LoadObject = _interopRequireDefault(require("../LoadObject"));

var _fetch = _interopRequireDefault(require("../fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RestDAO =
/*#__PURE__*/
function (_Subscription) {
  _inherits(RestDAO, _Subscription);

  function RestDAO(_ref) {
    var _this;

    var entityName = _ref.entityName;

    _classCallCheck(this, RestDAO);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RestDAO).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_countLoaderByQuery", new Map());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_entityLoaderById", new Map());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_entityIdsLoaderByQuery", new Map());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_entityName", void 0);

    _this._entityName = entityName;
    return _this;
  }

  _createClass(RestDAO, [{
    key: "getEntityName",
    value: function getEntityName() {
      return this._entityName;
    }
  }, {
    key: "__count",
    value: function __count(path, queryParams) {
      var _this2 = this;

      var cacheKey = this.__getCacheKey(path, queryParams);

      if (!this._countLoaderByQuery.has(cacheKey)) {
        this._countLoaderByQuery.set(cacheKey, _LoadObject.default.loading());

        this.__emitChanges();

        (0, _fetch.default)(path, _objectSpread({
          method: 'GET'
        }, queryParams)).then(function (countResult) {
          _this2._countLoaderByQuery.set(cacheKey, _LoadObject.default.withValue((0, _nullthrows.default)(countResult)));

          _this2.__emitChanges();
        }).catch(function (error) {
          _Subscription2.default.__emitError(error);

          _this2._countLoaderByQuery.set(cacheKey, _LoadObject.default.withError(error));

          _this2.__emitChanges();
        });
      }

      return (0, _nullthrows.default)(this._countLoaderByQuery.get(cacheKey));
    }
  }, {
    key: "__getMany",
    value: function __getMany(path, queryParams) {
      var _this3 = this;

      var cacheKey = this.__getCacheKey(path, queryParams);

      if (!this._entityIdsLoaderByQuery.has(cacheKey)) {
        this._entityIdsLoaderByQuery.set(cacheKey, _LoadObject.default.loading());

        this.__emitChanges();

        (0, _fetch.default)(path, _objectSpread({
          method: 'GET'
        }, queryParams)).then(function (items) {
          var ids = (0, _nullthrows.default)(items).map(function (_ref2) {
            var id = _ref2.id;
            return id;
          });
          (0, _nullthrows.default)(items).forEach(function (item) {
            return _this3._entityLoaderById.set(item.id, _LoadObject.default.withValue(item));
          });

          _this3._entityIdsLoaderByQuery.set(cacheKey, _LoadObject.default.withValue(ids));

          _this3.__emitChanges();
        }).catch(function (error) {
          _Subscription2.default.__emitError(error);

          _this3._entityIdsLoaderByQuery.set(cacheKey, _LoadObject.default.withError(error));

          _this3.__emitChanges();
        });
      }

      var result = (0, _nullthrows.default)(this._entityIdsLoaderByQuery.get(cacheKey)).map(function (ids) {
        return ids.map(function (id) {
          var loader = (0, _nullthrows.default)(_this3._entityLoaderById.get(id.toString()));
          return loader;
        });
      });
      return result;
    }
  }, {
    key: "__getOne",
    value: function __getOne(path, id, queryParams) {
      var _this4 = this;

      var stringifiedId = id.toString();

      if (!this._entityLoaderById.has(stringifiedId)) {
        this._entityLoaderById.set(stringifiedId, _LoadObject.default.loading());

        this.__emitChanges();

        (0, _fetch.default)(path, _objectSpread({
          headers: [{
            name: 'Accept',
            value: 'application/json'
          }, {
            name: 'Content-Type',
            value: 'application/json'
          }],
          method: 'GET'
        }, queryParams)).then(function (result) {
          _this4._entityLoaderById.set(stringifiedId, _LoadObject.default.withValue((0, _nullthrows.default)(result)));

          _this4.__emitChanges();
        }).catch(function (error) {
          _Subscription2.default.__emitError(error);

          _this4._entityLoaderById.set(stringifiedId, _LoadObject.default.withError(error));

          _this4.__emitChanges();
        });
      }

      return (0, _nullthrows.default)(this._entityLoaderById.get(stringifiedId));
    }
  }, {
    key: "__fetchOne",
    value: function __fetchOne(path, queryParams) {
      var _this5 = this;

      var clientId = _ClientID.default.getClientId();

      this._entityLoaderById.set(clientId, _LoadObject.default.loading());

      this.__emitChanges();

      (0, _fetch.default)(path, _objectSpread({
        method: 'GET'
      }, queryParams)).then(function (result) {
        _this5._entityLoaderById.set(clientId, _LoadObject.default.withValue((0, _nullthrows.default)(result)));

        _this5.__emitChanges();
      }).catch(function (error) {
        _Subscription2.default.__emitError(error);

        _this5._entityLoaderById.set(clientId, _LoadObject.default.withError(error));

        _this5.__emitChanges();
      });
      return clientId;
    }
  }, {
    key: "__post",
    value: function __post(path, mutator, queryParams) {
      var _this6 = this;

      var clientId = _ClientID.default.getClientId();

      this._entityLoaderById.set(clientId, _LoadObject.default.creating());

      (0, _fetch.default)(path, _objectSpread({
        body: JSON.stringify(mutator),
        headers: [{
          name: 'Accept',
          value: 'application/json'
        }, {
          name: 'Content-Type',
          value: 'application/json'
        }],
        method: 'POST'
      }, queryParams)).then(function (item) {
        _this6._flushQueryCaches();

        _this6._entityLoaderById.set((0, _nullthrows.default)(item).id, _LoadObject.default.withValue((0, _nullthrows.default)(item)));

        _this6._entityLoaderById.set(clientId, (0, _nullthrows.default)(_this6._entityLoaderById.get((0, _nullthrows.default)(item).id)));

        _this6.__emitChanges();
      }).catch(function (error) {
        _Subscription2.default.__emitError(error);

        _this6._entityLoaderById.set(clientId, _LoadObject.default.withError(error));

        _this6.__emitChanges();
      });
      return clientId;
    }
  }, {
    key: "__put",
    value: function __put(path, id, mutator, queryParams) {
      var _this7 = this;

      var stringifiedID = id.toString();

      var entity = this._entityLoaderById.get(stringifiedID) || _LoadObject.default.empty();

      this._entityLoaderById.set(stringifiedID, entity.updating());

      var clientId = _ClientID.default.getClientId();

      this._entityLoaderById.set(clientId, entity.updating());

      this.__emitChanges();

      (0, _fetch.default)(path, _objectSpread({
        body: JSON.stringify(mutator),
        headers: [{
          name: 'Accept',
          value: 'application/json'
        }, {
          name: 'Content-Type',
          value: 'application/json'
        }]
      }, queryParams, {
        method: 'PUT'
      })).then(function (item) {
        _this7._flushQueryCaches();

        _this7._entityLoaderById.set((0, _nullthrows.default)(item).id, _LoadObject.default.withValue((0, _nullthrows.default)(item)));

        _this7._entityLoaderById.set(clientId, (0, _nullthrows.default)(_this7._entityLoaderById.get((0, _nullthrows.default)(item).id)));

        _this7.__emitChanges();
      }).catch(function (error) {
        _Subscription2.default.__emitError(error);

        _this7._entityLoaderById.set(clientId, _LoadObject.default.withError(error));

        _this7.__emitChanges();
      });
      return clientId;
    }
  }, {
    key: "__delete",
    value: function __delete(path, id, queryParams) {
      var _this8 = this;

      var clientId = _ClientID.default.getClientId();

      var stringifiedId = id.toString();

      var entity = this._entityLoaderById.get(stringifiedId) || _LoadObject.default.empty();

      this._entityLoaderById.set(stringifiedId, entity.deleting());

      this._entityLoaderById.set(clientId, _LoadObject.default.empty().deleting());

      this.__emitChanges();

      (0, _fetch.default)(path, _objectSpread({
        method: 'DELETE'
      }, queryParams)).then(function () {
        _this8._entityLoaderById.set(clientId, _LoadObject.default.empty());

        _this8._entityLoaderById.set(id, _LoadObject.default.empty());

        _this8.__emitChanges();

        _this8._flushQueryCaches();

        _this8.__emitChanges();
      }).catch(function (error) {
        _Subscription2.default.__emitError(error);

        _this8._entityLoaderById.set(clientId, _LoadObject.default.withError(error));

        _this8.__emitChanges();
      });
      return clientId;
    }
  }, {
    key: "flushCustomCache",
    value: function flushCustomCache() {}
  }, {
    key: "flushCache",
    value: function flushCache() {
      this._entityLoaderById = new Map();

      this._flushQueryCaches();

      this.__emitChanges();
    }
  }, {
    key: "flushCacheForEntity",
    value: function flushCacheForEntity(entityId) {
      this._entityLoaderById.delete(entityId);

      this.__emitChanges();
    }
  }, {
    key: "flushQueryCaches",
    value: function flushQueryCaches() {
      this._flushQueryCaches();

      this.__emitChanges();
    }
  }, {
    key: "waitForLoaded",
    value: function waitForLoaded(fn, timeout) {
      return this.waitForLoadedNullable(fn, timeout).then(function (result) {
        return (0, _nullthrows.default)(result);
      });
    }
  }, {
    key: "waitForLoadedNullable",
    value: function waitForLoadedNullable(fn) {
      var _this9 = this;

      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return reject(new Error('Timeout!'));
        }, timeout);

        var fetchAndResolve = function fetchAndResolve() {
          var loader = fn(_this9);

          if (loader.hasOperation()) {
            return;
          }

          loader = loader.map(function (result) {
            if (!Array.isArray(result)) {
              return result;
            }

            if (result.some(function (item) {
              return item instanceof _LoadObject.default ? item.hasOperation() : false;
            })) {
              return _LoadObject.default.loading();
            }

            return result.map(function (item) {
              return item instanceof _LoadObject.default ? item.getValue() : item;
            });
          });

          if (loader.hasOperation()) {
            return;
          }

          _this9.unsubscribe(fetchAndResolve);

          if (loader.hasError()) {
            reject(loader.getErrorEnforcing());
            return;
          }

          resolve(loader.getValue());
        };

        _this9.subscribe(fetchAndResolve);

        fetchAndResolve();
      });
    }
  }, {
    key: "_flushQueryCaches",
    value: function _flushQueryCaches() {
      this._entityIdsLoaderByQuery = new Map();
      this._countLoaderByQuery = new Map();
    }
  }, {
    key: "__getCacheKey",
    value: function __getCacheKey(path, queryParams) {
      return path + JSON.stringify(queryParams || '_');
    }
  }]);

  return RestDAO;
}(_Subscription2.default);

var _default = RestDAO;
exports.default = _default;