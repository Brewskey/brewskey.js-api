"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nullthrows = _interopRequireDefault(require("nullthrows"));

var _debounce = _interopRequireDefault(require("debounce"));

var _BaseODataDAO2 = _interopRequireDefault(require("./BaseODataDAO"));

var _LoadObject = _interopRequireDefault(require("../LoadObject"));

var _Subscription = _interopRequireDefault(require("./Subscription"));

var _arrayFlatten = _interopRequireDefault(require("array-flatten"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STANDARD_PAGE_SIZE = 40;

var ODataDAO = /*#__PURE__*/function (_BaseODataDAO) {
  _inherits(ODataDAO, _BaseODataDAO);

  var _super = _createSuper(ODataDAO);

  function ODataDAO() {
    var _this;

    _classCallCheck(this, ODataDAO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_countLoaderByQuery", new Map());

    _defineProperty(_assertThisInitialized(_this), "_entityIDsLoaderByQuery", new Map());

    _defineProperty(_assertThisInitialized(_this), "_customLoaderByQuery", new Map());

    _defineProperty(_assertThisInitialized(_this), "_customHandlerByQuery", new Map());

    _defineProperty(_assertThisInitialized(_this), "_entityLoaderByID", new Map());

    _defineProperty(_assertThisInitialized(_this), "_runFlushCache", null);

    _defineProperty(_assertThisInitialized(_this), "_currentCountQueries", new Set());

    _defineProperty(_assertThisInitialized(_this), "_currentEntityQueries", new Set());

    _defineProperty(_assertThisInitialized(_this), "_currentEntityIDsQueries", new Set());

    _defineProperty(_assertThisInitialized(_this), "_currentCustomQueries", new Set());

    return _this;
  }

  _createClass(ODataDAO, [{
    key: "deleteByID",
    value: function deleteByID(id) {
      var _this2 = this;

      var stringifiedID = id.toString();

      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject["default"].empty();

      this._entityLoaderByID.set(stringifiedID, entity.deleting());

      var clientID = this._getClientID();

      this._entityLoaderByID.set(clientID, _LoadObject["default"].empty().deleting());

      this.__emitChanges();

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      /* params */
      {}, 'DELETE').then(function () {
        _this2._entityLoaderByID.set(clientID, _LoadObject["default"].empty());

        _this2._entityLoaderByID.set(id, _LoadObject["default"].empty());

        _this2.__emitChanges();

        _this2._flushQueryCaches();

        _this2.__emitChanges();
      })["catch"](function (error) {
        _Subscription["default"].__emitError(error);

        _this2._updateCacheForError(clientID, error);
      });

      return clientID;
    }
  }, {
    key: "count",
    value: function count(queryOptions) {
      var _this3 = this;

      return this.__countCustom(function (countQueryOptions) {
        return _this3.__buildHandler(_objectSpread({}, countQueryOptions));
      }, queryOptions);
    }
  }, {
    key: "__countCustom",
    value: function __countCustom(getOHandler) {
      var queryOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var baseQueryOptions = this._getCountQueryOptions(queryOptions);

      var cacheKey = this._getCacheKey(_objectSpread({}, baseQueryOptions, {
        __custom_key__: key
      }));

      this._currentCountQueries.add(cacheKey);

      if (!this._countLoaderByQuery.has(cacheKey)) {
        this._hydrateCount(getOHandler, baseQueryOptions, key);
      }

      return (0, _nullthrows["default"])(this._countLoaderByQuery.get(cacheKey));
    }
  }, {
    key: "getEntitiesCache",
    value: function getEntitiesCache() {
      return Array.from(this._entityLoaderByID.values());
    }
  }, {
    key: "fetchByID",
    value: function fetchByID(id) {
      var stringifiedID = id.toString();

      this._currentEntityQueries.add(stringifiedID);

      if (!this._entityLoaderByID.has(stringifiedID)) {
        this._hydrateSingle(stringifiedID);
      }

      return (0, _nullthrows["default"])(this._entityLoaderByID.get(stringifiedID));
    }
  }, {
    key: "fetchByIDs",
    value: function fetchByIDs(ids) {
      var _this4 = this;

      var stringifiedIds = ids.map(String);
      var idsToLoad = stringifiedIds.filter(function (id) {
        return !_this4._entityLoaderByID.has(id);
      });

      if (idsToLoad.length) {
        idsToLoad.forEach(function (id) {
          _this4._entityLoaderByID.set(id.toString(), _LoadObject["default"].loading());
        }); // This URI will look like `pours/Default.GetManyByIDs(ids=['58','59'])/`

        var handler = this.__buildHandler();

        handler.customParam('ids', idsToLoad.join(','));

        this.__resolveMany(handler).then(function (results) {
          var entitiesByID = new Map(results.map(function (item) {
            return [item.id, item];
          }));
          idsToLoad.forEach(function (id) {
            var entity = entitiesByID.get(id);

            if (entity) {
              _this4._updateCacheForEntity(entity, false);
            } else {
              _this4._updateCacheForError(id, new Error("Could not load ".concat(_this4.getEntityName(), " ").concat(id.toString())));
            }
          });

          _this4.__emitChanges();
        })["catch"](function (error) {
          _Subscription["default"].__emitError(error);

          stringifiedIds.forEach(function (id) {
            return _this4._updateCacheForError(id, error, false);
          });

          _this4.__emitChanges();
        });
      }

      return new Map(stringifiedIds.map(function (id) {
        return [id, (0, _nullthrows["default"])(_this4._entityLoaderByID.get(id))];
      }));
    }
  }, {
    key: "fetchMany",
    value: function fetchMany() {
      var _this5 = this;

      var queryOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var cacheKey = this._getCacheKey(queryOptions);

      this._currentEntityIDsQueries.add(cacheKey);

      if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
        this._hydrateMany(queryOptions);
      }

      var countQueryKey = this._getCacheKey(_objectSpread({}, this._getCountQueryOptions(queryOptions), {
        __custom_key__: ''
      }));

      var loader = this._countLoaderByQuery.get(countQueryKey) || _LoadObject["default"].withValue(-1);

      var idsLoader = (0, _nullthrows["default"])(this._entityIDsLoaderByQuery.get(cacheKey));
      var resultMapLoader = idsLoader.map(function (ids) {
        return _this5.fetchByIDs(ids);
      });

      var resultsLoader = _LoadObject["default"].merge([loader, idsLoader, resultMapLoader]).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
            count = _ref2[0],
            ids = _ref2[1],
            resultMap = _ref2[2];

        var entities = ids.map(function (id) {
          var _resultMap$get;

          return (_resultMap$get = resultMap.get(id.toString())) !== null && _resultMap$get !== void 0 ? _resultMap$get : _LoadObject["default"].empty();
        });
        var _queryOptions$take = queryOptions.take,
            take = _queryOptions$take === void 0 ? 100 : _queryOptions$take;
        var delta = count % take - entities.length;

        if (count === -1 || entities.length === take || delta <= 0) {
          return entities;
        }

        var missedLoaders = _toConsumableArray(Array(delta)).map(function () {
          return _LoadObject["default"].loading();
        });

        return [].concat(_toConsumableArray(entities), _toConsumableArray(missedLoaders));
      });

      return resultsLoader;
    }
  }, {
    key: "fetchAll",
    value: function fetchAll(queryOptions) {
      var _this6 = this;

      return this.count(queryOptions).map(function (count) {
        return (0, _arrayFlatten["default"])(_toConsumableArray(Array(Math.ceil(count / STANDARD_PAGE_SIZE))).map(function (_, index) {
          var skip = STANDARD_PAGE_SIZE * index;

          var loader = _this6.fetchMany(_objectSpread({}, queryOptions, {
            skip: skip,
            take: STANDARD_PAGE_SIZE
          }));

          var itemLoaders = _toConsumableArray(Array(Math.min(STANDARD_PAGE_SIZE, count - skip)));

          if (loader.isLoading()) {
            return itemLoaders.map(function () {
              return _LoadObject["default"].loading();
            });
          }

          if (loader.hasError()) {
            return itemLoaders.map(function () {
              return _LoadObject["default"].withError(loader.getErrorEnforcing());
            });
          }

          return loader.getValueEnforcing();
        }));
      });
    }
  }, {
    key: "fetchSingle",
    value: function fetchSingle(queryOptions) {
      var combinedQueryOptions = _objectSpread({
        orderBy: [{
          column: 'id',
          direction: 'desc'
        }]
      }, queryOptions, {
        take: 1
      });

      return this.fetchMany(combinedQueryOptions).map(function (items) {
        return items[0] || _LoadObject["default"].empty();
      });
    }
  }, {
    key: "flushCache",
    value: function flushCache() {
      this._flushQueryCaches();

      this.__emitChanges();
    }
  }, {
    key: "flushCacheForEntity",
    value: function flushCacheForEntity(entityID) {
      this._hydrateSingle(entityID.toString());

      this.__emitChanges();
    }
  }, {
    key: "flushCustomCache",
    value: function flushCustomCache() {
      this._flushCustomCache();
    }
  }, {
    key: "flushQueryCaches",
    value: function flushQueryCaches() {
      this._flushQueryCaches();

      this.__emitChanges();
    }
  }, {
    key: "patch",
    value: function patch(id, mutator) {
      var _this7 = this;

      var stringifiedID = id.toString();

      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject["default"].empty();

      this._entityLoaderByID.set(stringifiedID, entity.updating());

      var clientID = this._getClientID();

      this._entityLoaderByID.set(clientID, entity.updating());

      this.__emitChanges();

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID)), this.getTranslator().toApi(mutator), 'PATCH').then(function (result) {
        _this7._flushQueryCaches();

        _this7._updateCacheForEntity(result, false);

        _this7._entityLoaderByID.set(clientID, (0, _nullthrows["default"])(_this7._entityLoaderByID.get(result.id)));

        _this7.__emitChanges();
      })["catch"](function (error) {
        _Subscription["default"].__emitError(error);

        _this7._updateCacheForError(clientID, error);
      });

      return clientID;
    }
  }, {
    key: "post",
    value: function post(mutator) {
      var _this8 = this;

      var clientID = this._getClientID();

      this._entityLoaderByID.set(clientID, _LoadObject["default"].creating());

      this.__resolveSingle(this.__buildHandler(), this.getTranslator().toApi(mutator), 'POST').then(function (result) {
        _this8._flushQueryCaches();

        _this8._updateCacheForEntity(result, false); // The clientID has a reference to the load object


        _this8._entityLoaderByID.set(clientID, (0, _nullthrows["default"])(_this8._entityLoaderByID.get(result.id)));

        _this8.__emitChanges();
      })["catch"](function (error) {
        _Subscription["default"].__emitError(error);

        _this8._entityLoaderByID.set(clientID, _LoadObject["default"].withError(error));

        _this8.__emitChanges();
      });

      return clientID;
    }
  }, {
    key: "put",
    value: function put(id, mutator) {
      var _this9 = this;

      var stringifiedID = id.toString();

      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject["default"].empty();

      this._entityLoaderByID.set(stringifiedID, entity.updating());

      var clientID = this._getClientID();

      this._entityLoaderByID.set(clientID, entity.updating());

      this.__emitChanges();

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID)), this.getTranslator().toApi(mutator), 'PUT').then(function (result) {
        _this9._flushQueryCaches();

        _this9._updateCacheForEntity(result, false); // The clientID has a reference to the load object


        _this9._entityLoaderByID.set(clientID, (0, _nullthrows["default"])(_this9._entityLoaderByID.get(result.id)));

        _this9.__emitChanges();
      })["catch"](function (error) {
        _Subscription["default"].__emitError(error);

        _this9._updateCacheForError(clientID, error);
      });

      return clientID;
    }
  }, {
    key: "waitForLoaded",
    value: function waitForLoaded(fn, timeout) {
      return this.waitForLoadedNullable(fn, timeout).then(function (result) {
        return (0, _nullthrows["default"])(result);
      });
    }
  }, {
    key: "waitForLoadedNullable",
    value: function waitForLoadedNullable(fn) {
      var _this10 = this;

      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return reject(new Error('Timeout!'));
        }, timeout);

        var fetchAndResolve = function fetchAndResolve() {
          var fnResult = fn(_this10); // if (fnResult instanceof Map) {
          //   const entries = Array.from(fnResult.values());
          //   if (
          //     entries.some(item =>
          //       item instanceof LoadObject ? item.hasOperation() : false,
          //     )
          //   ) {
          //     return;
          //   }
          //   resolve(
          //     new Map(
          //       Array.from(fnResult.entries()).map(([key, value]) => [
          //         key,
          //         value.getValueEnforcing(),
          //       ]),
          //     ),
          //   );
          //   this.unsubscribe(fetchAndResolve);
          //   return;
          // }

          var loader = fnResult instanceof _LoadObject["default"] ? fnResult : _LoadObject["default"].withValue(fnResult);

          if (loader.hasOperation()) {
            return;
          }

          var data = loader.getValue();

          if (loader.hasError()) {
            reject(loader.getErrorEnforcing());
            return;
          }

          if (Array.isArray(data)) {
            if (data.some(function (item) {
              return item instanceof _LoadObject["default"] ? item.hasOperation() : false;
            })) {
              return;
            }

            resolve(data.map(function (item) {
              return item instanceof _LoadObject["default"] ? item.getValue() : item;
            }));
          } else {
            resolve(data);
          }

          _this10.unsubscribe(fetchAndResolve);
        };

        _this10.subscribe(fetchAndResolve);

        fetchAndResolve();
      });
    }
  }, {
    key: "__mutateCustom",
    value: function __mutateCustom(handler, method, id) {
      var _this11 = this;

      var mutator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var stringifiedID = null;

      if (id) {
        stringifiedID = id.toString();
      }

      var clientID = this._getClientID();

      var entity = this._entityLoaderByID.get(stringifiedID || clientID) || _LoadObject["default"].empty();

      if (method === 'DELETE') {
        this._entityLoaderByID.set(stringifiedID || clientID, entity.deleting());
      } else {
        this._entityLoaderByID.set(stringifiedID || clientID, entity.updating());
      }

      this.__emitChanges();

      this.__resolve(handler, mutator, method) // TODO - We need to rethink how the chache should be changed here..
      // I'm not sure what the expected behavior is for this response. Is it
      // standardized?
      .then(function (result) {
        if (stringifiedID) {
          // We want whatever uses this store to refetch the entity
          _this11._entityLoaderByID["delete"](stringifiedID);
        } else {
          _this11._updateCacheForEntity(result, false);

          _this11._entityLoaderByID.set(clientID, (0, _nullthrows["default"])(_this11._entityLoaderByID.get(result.id)));
        }

        _this11.__emitChanges();
      })["catch"](function (error) {
        _Subscription["default"].__emitError(error);

        _this11._updateCacheForError(stringifiedID || clientID, error);
      });

      return stringifiedID || clientID;
    }
  }, {
    key: "__fetchCustom",
    value: function __fetchCustom(handler, queryOptions) {
      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var cacheKey = this._getCacheKey(_objectSpread({}, queryOptions, {
        __custom_key__: key
      }));

      this._currentCustomQueries.add(cacheKey);

      this._customHandlerByQuery.set(cacheKey, handler);

      if (!this._customLoaderByQuery.has(cacheKey)) {
        this._hydrateCustom(queryOptions, key);
      }

      return (0, _nullthrows["default"])(this._customLoaderByQuery.get(cacheKey));
    }
  }, {
    key: "_getClientID",
    value: function _getClientID() {
      ODataDAO._clientID += 1;
      return "CLIENT_ID:".concat(ODataDAO._clientID);
    }
  }, {
    key: "_flushQueryCaches",
    value: function _flushQueryCaches() {
      var _this12 = this;

      if (this._runFlushCache) {
        return;
      }

      this._currentEntityQueries.clear();

      this._currentCountQueries.clear();

      this._currentCustomQueries.clear();

      this._currentEntityIDsQueries.clear();

      this._setLoadersToUpdating(this._entityIDsLoaderByQuery);

      this._setLoadersToUpdating(this._countLoaderByQuery);

      this._setLoadersToUpdating(this._customLoaderByQuery);

      this._runFlushCache = (0, _debounce["default"])(function () {
        Array.from(_this12._currentEntityQueries).filter(function (id) {
          return id.toString().indexOf('CLIENT_ID:') !== 0;
        }).forEach(function (id) {
          return _this12._hydrateSingle(id, false);
        });
        _this12._entityIDsLoaderByQuery = _this12._rebuildMap(_this12._entityIDsLoaderByQuery, _this12._currentEntityIDsQueries, function (queryOptions) {
          return _this12._hydrateMany(queryOptions);
        });
        _this12._countLoaderByQuery = _this12._rebuildMap(_this12._countLoaderByQuery, _this12._currentCountQueries, function (queryOptions) {
          return _this12._hydrateCount(function (countQueryOptions) {
            return _this12.__buildHandler(_objectSpread({}, queryOptions, {}, countQueryOptions));
          }, queryOptions);
        });

        _this12._rehydrateCustom();

        _this12._runFlushCache = null;

        _this12.__emitChanges();
      }, 10);

      this._runFlushCache();
    }
  }, {
    key: "_flushCustomCache",
    value: function _flushCustomCache() {
      var _this13 = this;

      if (this._runFlushCache) {
        return;
      }

      this._currentCountQueries.clear();

      this._currentCustomQueries.clear();

      this._currentEntityIDsQueries.clear();

      this._setLoadersToUpdating(this._customLoaderByQuery);

      this._runFlushCache = (0, _debounce["default"])(function () {
        _this13._rehydrateCustom();

        _this13._runFlushCache = null;

        _this13.__emitChanges();
      }, 10);

      this._runFlushCache();
    }
  }, {
    key: "_rehydrateCustom",
    value: function _rehydrateCustom() {
      var _this14 = this;

      var toRemove = [];

      this._customHandlerByQuery.forEach(function (_, key) {
        // Remove any queryies that aren't currently in use
        if (!_this14._currentCustomQueries.has(key)) {
          toRemove.push(key);
          return;
        }

        var _JSON$parse = JSON.parse(key),
            customKey = _JSON$parse.__custom_key__,
            queryParams = _objectWithoutProperties(_JSON$parse, ["__custom_key__"]);

        _this14._hydrateCustom(queryParams, customKey);
      });

      toRemove.forEach(function (key) {
        _this14._customLoaderByQuery["delete"](key);

        _this14._customHandlerByQuery["delete"](key);
      });
    }
  }, {
    key: "_setLoadersToUpdating",
    value: function _setLoadersToUpdating(map) {
      map.forEach(function (value, key) {
        return map.set(key, value.updating());
      });
    }
  }, {
    key: "_rebuildMap",
    value: function _rebuildMap(map, set, onUpdate) {
      var savedItems = Array.from(set).map(function (queryOptionString) {
        onUpdate(JSON.parse(queryOptionString.toString()));
        var loader = (0, _nullthrows["default"])(map.get(queryOptionString));
        return [queryOptionString, loader];
      });
      return new Map(savedItems);
    }
  }, {
    key: "_hydrateSingle",
    value: function _hydrateSingle(stringifiedID) {
      var _this15 = this;

      var shouldEmitChanges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var initialLoader = this._entityLoaderByID.has(stringifiedID) ? (0, _nullthrows["default"])(this._entityLoaderByID.get(stringifiedID)).updating() : _LoadObject["default"].loading();

      this._entityLoaderByID.set(stringifiedID, initialLoader);

      this.__emitChanges();

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID))).then(function (result) {
        return _this15._updateCacheForEntity(result, shouldEmitChanges);
      })["catch"](function (error) {
        _Subscription["default"].__emitError(error);

        _this15._updateCacheForError(stringifiedID, error);
      });
    }
  }, {
    key: "_hydrateMany",
    value: function _hydrateMany(queryOptions) {
      var _this16 = this;

      var cacheKey = this._getCacheKey(queryOptions);

      var initialLoader = this._entityIDsLoaderByQuery.has(cacheKey) ? (0, _nullthrows["default"])(this._entityIDsLoaderByQuery.get(cacheKey)).updating() : _LoadObject["default"].loading();

      this._entityIDsLoaderByQuery.set(cacheKey, initialLoader);

      this.__emitChanges();

      var handler = this.__buildHandler(queryOptions, false);

      handler = handler.select('id');

      this.__resolveManyIDs(handler).then(function (ids) {
        var stringifiedIds = ids.map(String);

        _this16._entityIDsLoaderByQuery.set(cacheKey, _LoadObject["default"].withValue(stringifiedIds));

        _this16.__emitChanges();

        _this16.fetchByIDs(stringifiedIds);
      })["catch"](function (error) {
        _Subscription["default"].__emitError(error);

        var loader = _this16._entityIDsLoaderByQuery.get(cacheKey);

        _this16._entityIDsLoaderByQuery.set(cacheKey, loader ? loader.setError(error) : _LoadObject["default"].withError(error));

        _this16.__emitChanges();
      });
    }
  }, {
    key: "_hydrateCount",
    value: function _hydrateCount(getOHandler, queryOptions) {
      var _this17 = this;

      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var baseQueryOptions = this._getCountQueryOptions(queryOptions);

      var cacheKey = this._getCacheKey(_objectSpread({}, baseQueryOptions, {
        __custom_key__: key
      }));

      var initialLoader = this._countLoaderByQuery.has(cacheKey) ? (0, _nullthrows["default"])(this._countLoaderByQuery.get(cacheKey)).updating() : _LoadObject["default"].loading();

      this._countLoaderByQuery.set(cacheKey, initialLoader);

      this.__emitChanges();

      this.__resolve(getOHandler(_objectSpread({}, baseQueryOptions, {
        shouldCount: true,
        take: 0
      }))).then(function (result) {
        _this17._countLoaderByQuery.set(cacheKey, _LoadObject["default"].withValue(result.inlinecount));

        _this17.__emitChanges();
      })["catch"](function (error) {
        _Subscription["default"].__emitError(error);

        var loader = _this17._countLoaderByQuery.get(cacheKey);

        _this17._countLoaderByQuery.set(cacheKey, loader ? loader.setError(error) : _LoadObject["default"].withError(error));

        _this17.__emitChanges();
      });
    }
  }, {
    key: "_hydrateCustom",
    value: function _hydrateCustom(queryOptions) {
      var _this18 = this;

      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var cacheKey = this._getCacheKey(_objectSpread({}, queryOptions, {
        __custom_key__: key
      }));

      var initialLoader = this._customLoaderByQuery.has(cacheKey) ? (0, _nullthrows["default"])(this._customLoaderByQuery.get(cacheKey)).updating() : _LoadObject["default"].loading();

      this._customLoaderByQuery.set(cacheKey, initialLoader);

      this.__emitChanges();

      this.__resolve((0, _nullthrows["default"])(this._customHandlerByQuery.get(cacheKey))).then(function (result) {
        _this18._customLoaderByQuery.set(cacheKey, _LoadObject["default"].withValue(result.data));

        _this18.__emitChanges();
      })["catch"](function (error) {
        _Subscription["default"].__emitError(error);

        _this18._customLoaderByQuery.set(cacheKey, _LoadObject["default"].withError(error));

        _this18.__emitChanges();
      });
    }
  }, {
    key: "_getCacheKey",
    value: function _getCacheKey(queryOptions) {
      return JSON.stringify(queryOptions || '_');
    }
  }, {
    key: "_getCountQueryOptions",
    value: function _getCountQueryOptions() {
      var queryOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var orderBy = queryOptions.orderBy,
          skip = queryOptions.skip,
          take = queryOptions.take,
          countQueryOptions = _objectWithoutProperties(queryOptions, ["orderBy", "skip", "take"]);

      return countQueryOptions;
    }
  }, {
    key: "_updateCacheForEntity",
    value: function _updateCacheForEntity(entity) {
      var shouldEmitChanges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this._entityLoaderByID.set(entity.id.toString(), _LoadObject["default"].withValue(entity));

      if (shouldEmitChanges) {
        this.__emitChanges();
      }
    }
  }, {
    key: "_updateCacheForError",
    value: function _updateCacheForError(id, error) {
      var shouldEmitChanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this._entityLoaderByID.set(id.toString(), _LoadObject["default"].withError(error));

      if (shouldEmitChanges) {
        this.__emitChanges();
      }
    }
  }]);

  return ODataDAO;
}(_BaseODataDAO2["default"]);

_defineProperty(ODataDAO, "_clientID", 0);

var _default = ODataDAO;
exports["default"] = _default;