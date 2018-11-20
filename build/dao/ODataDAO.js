"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nullthrows = _interopRequireDefault(require("nullthrows"));

var _BaseODataDAO2 = _interopRequireDefault(require("./BaseODataDAO"));

var _LoadObject = _interopRequireDefault(require("../LoadObject"));

var _Subcription = _interopRequireDefault(require("./Subcription"));

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

var ODataDAO =
/*#__PURE__*/
function (_BaseODataDAO) {
  _inherits(ODataDAO, _BaseODataDAO);

  function ODataDAO() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ODataDAO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ODataDAO)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_countLoaderByQuery", new Map());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_entityIDsLoaderByQuery", new Map());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_customLoaderByQuery", new Map());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_entityLoaderByID", new Map());

    return _this;
  }

  _createClass(ODataDAO, [{
    key: "deleteByID",
    value: function deleteByID(id) {
      var _this2 = this;

      var stringifiedID = id.toString();

      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject.default.empty();

      this._entityLoaderByID.set(stringifiedID, entity.deleting());

      var clientID = this._getClientID();

      this._entityLoaderByID.set(clientID, _LoadObject.default.empty().deleting());

      this.__emitChanges();

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      /* params */
      {}, 'delete').then(function () {
        _this2._entityLoaderByID.set(clientID, _LoadObject.default.empty());

        _this2._entityLoaderByID.set(id, _LoadObject.default.empty());

        _this2.__emitChanges();

        _this2._flushQueryCaches();

        _this2.__emitChanges();
      }).catch(function (error) {
        _Subcription.default.__emitError(error);

        _this2._updateCacheForError(clientID, error);
      });

      return clientID;
    }
  }, {
    key: "count",
    value: function count(queryOptions) {
      var _this3 = this;

      return this.__countCustom(function (countQueryOptions) {
        return _this3.__buildHandler(_objectSpread({}, queryOptions, countQueryOptions));
      }, queryOptions);
    }
  }, {
    key: "__countCustom",
    value: function __countCustom(getOHandler, queryOptions) {
      var _this4 = this;

      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var cacheKey = this._getCacheKey(queryOptions) + key;

      if (!this._countLoaderByQuery.has(cacheKey)) {
        this._countLoaderByQuery.set(cacheKey, _LoadObject.default.loading());

        this.__emitChanges();

        this.__resolve(getOHandler({
          shouldCount: true,
          take: 0
        })).then(function (result) {
          _this4._countLoaderByQuery.set(cacheKey, _LoadObject.default.withValue(result.inlinecount));

          _this4.__emitChanges();
        }).catch(function (error) {
          _Subcription.default.__emitError(error);

          var loader = _this4._countLoaderByQuery.get(cacheKey);

          _this4._countLoaderByQuery.set(cacheKey, loader ? loader.setError(error) : _LoadObject.default.withError(error));

          _this4.__emitChanges();
        });
      }

      return (0, _nullthrows.default)(this._countLoaderByQuery.get(cacheKey));
    }
  }, {
    key: "fetchByID",
    value: function fetchByID(id) {
      var _this5 = this;

      var stringifiedID = id.toString();

      if (!this._entityLoaderByID.has(stringifiedID)) {
        this._entityLoaderByID.set(stringifiedID, _LoadObject.default.loading());

        this.__emitChanges();

        this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID))).then(function (result) {
          return _this5._updateCacheForEntity(result);
        }).catch(function (error) {
          _Subcription.default.__emitError(error);

          _this5._updateCacheForError(stringifiedID, error);
        });
      }

      return (0, _nullthrows.default)(this._entityLoaderByID.get(stringifiedID));
    }
  }, {
    key: "fetchByIDs",
    value: function fetchByIDs(ids) {
      var _this6 = this;

      var stringifiedIds = ids.map(String);
      var idsToLoad = stringifiedIds.filter(function (id) {
        return !_this6._entityLoaderByID.has(id);
      });

      if (idsToLoad.length) {
        idsToLoad.forEach(function (id) {
          _this6._entityLoaderByID.set(id.toString(), _LoadObject.default.loading());
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
              _this6._updateCacheForEntity(entity, false);
            } else {
              _this6._updateCacheForError(id, new Error("Could not load ".concat(_this6.getEntityName(), " ").concat(id.toString())));
            }
          });

          _this6.__emitChanges();
        }).catch(function (error) {
          _Subcription.default.__emitError(error);

          stringifiedIds.forEach(function (id) {
            return _this6._updateCacheForError(id, error, false);
          });

          _this6.__emitChanges();
        });
      }

      return new Map(stringifiedIds.map(function (id) {
        return [id, (0, _nullthrows.default)(_this6._entityLoaderByID.get(id))];
      }));
    }
  }, {
    key: "fetchMany",
    value: function fetchMany(queryOptions) {
      var _this7 = this;

      var cacheKey = this._getCacheKey(queryOptions);

      if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
        this._entityIDsLoaderByQuery.set(cacheKey, _LoadObject.default.loading());

        this.__emitChanges();

        var handler = this.__buildHandler(queryOptions, false);

        handler = handler.select('id');

        this.__resolveManyIDs(handler).then(function (ids) {
          var stringifiedIds = ids.map(String);

          _this7._entityIDsLoaderByQuery.set(cacheKey, _LoadObject.default.withValue(stringifiedIds));

          _this7.__emitChanges();

          _this7.fetchByIDs(stringifiedIds);
        }).catch(function (error) {
          _Subcription.default.__emitError(error);

          var loader = _this7._entityIDsLoaderByQuery.get(cacheKey);

          _this7._entityIDsLoaderByQuery.set(cacheKey, loader ? loader.setError(error) : _LoadObject.default.withError(error));

          _this7.__emitChanges();
        });
      }

      return (0, _nullthrows.default)(this._entityIDsLoaderByQuery.get(cacheKey)).map(function (ids) {
        var resultMap = _this7.fetchByIDs(ids);

        return ids.map(function (id) {
          return (0, _nullthrows.default)(resultMap.get(id.toString()));
        });
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
        return items[0] || _LoadObject.default.empty();
      });
    }
  }, {
    key: "flushCache",
    value: function flushCache() {
      this._entityLoaderByID = new Map();

      this._flushQueryCaches();

      this.__emitChanges();
    }
  }, {
    key: "flushCacheForEntity",
    value: function flushCacheForEntity(entityID) {
      this._entityLoaderByID.delete(entityID);

      this.__emitChanges();
    }
  }, {
    key: "flushCustomCache",
    value: function flushCustomCache() {
      this._customLoaderByQuery = new Map();

      this.__emitChanges();
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
      var _this8 = this;

      var stringifiedID = id.toString();

      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject.default.empty();

      this._entityLoaderByID.set(stringifiedID, entity.updating());

      var clientID = this._getClientID();

      this._entityLoaderByID.set(clientID, entity.updating());

      this.__emitChanges();

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID)), this.getTranslator().toApi(mutator), 'patch').then(function (result) {
        _this8._flushQueryCaches();

        _this8._updateCacheForEntity(result, false);

        _this8._entityLoaderByID.set(clientID, (0, _nullthrows.default)(_this8._entityLoaderByID.get(result.id)));

        _this8.__emitChanges();
      }).catch(function (error) {
        _Subcription.default.__emitError(error);

        _this8._updateCacheForError(clientID, error);
      });

      return clientID;
    }
  }, {
    key: "post",
    value: function post(mutator) {
      var _this9 = this;

      var clientID = this._getClientID();

      this._entityLoaderByID.set(clientID, _LoadObject.default.creating());

      this.__resolveSingle(this.__buildHandler(), this.getTranslator().toApi(mutator), 'post').then(function (result) {
        _this9._flushQueryCaches();

        _this9._updateCacheForEntity(result, false); // The clientID has a reference to the load object


        _this9._entityLoaderByID.set(clientID, (0, _nullthrows.default)(_this9._entityLoaderByID.get(result.id)));

        _this9.__emitChanges();
      }).catch(function (error) {
        _Subcription.default.__emitError(error);

        _this9._entityLoaderByID.set(clientID, _LoadObject.default.withError(error));

        _this9.__emitChanges();
      });

      return clientID;
    }
  }, {
    key: "put",
    value: function put(id, mutator) {
      var _this10 = this;

      var stringifiedID = id.toString();

      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject.default.empty();

      this._entityLoaderByID.set(stringifiedID, entity.updating());

      var clientID = this._getClientID();

      this._entityLoaderByID.set(clientID, entity.updating());

      this.__emitChanges();

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID)), this.getTranslator().toApi(mutator), 'put').then(function (result) {
        _this10._flushQueryCaches();

        _this10._updateCacheForEntity(result, false); // The clientID has a reference to the load object


        _this10._entityLoaderByID.set(clientID, (0, _nullthrows.default)(_this10._entityLoaderByID.get(result.id)));

        _this10.__emitChanges();
      }).catch(function (error) {
        _Subcription.default.__emitError(error);

        _this10._updateCacheForError(clientID, error);
      });

      return clientID;
    }
  }, {
    key: "waitForLoaded",
    value: function waitForLoaded(fn) {
      var _this11 = this;

      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return reject(new Error('Timeout!'));
        }, timeout);

        var fetchAndResolve = function fetchAndResolve() {
          var loader = fn(_this11);

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

          _this11.unsubscribe(fetchAndResolve);

          if (loader.hasError()) {
            reject(loader.getErrorEnforcing());
            return;
          }

          resolve(loader.getValueEnforcing());
        };

        _this11.subscribe(fetchAndResolve);

        fetchAndResolve();
      });
    }
  }, {
    key: "__mutateCustom",
    value: function __mutateCustom(handler, method, id, mutator) {
      var _this12 = this;

      var stringifiedID = null;

      if (id) {
        stringifiedID = id.toString();
      }

      var clientID = this._getClientID();

      var entity = this._entityLoaderByID.get(stringifiedID || clientID) || _LoadObject.default.empty();

      if (method === 'delete') {
        this._entityLoaderByID.set(stringifiedID || clientID, entity.deleting());
      } else {
        this._entityLoaderByID.set(stringifiedID || clientID, entity.updating());
      }

      this.__emitChanges();

      this.__resolve(handler, mutator, method).then(function (result) {
        if (stringifiedID) {
          // We want whatever uses this store to refetch the entity
          _this12._entityLoaderByID.delete(stringifiedID);
        } else {
          _this12._updateCacheForEntity(result, false);

          _this12._entityLoaderByID.set(clientID, (0, _nullthrows.default)(_this12._entityLoaderByID.get(result.id)));
        }

        _this12.__emitChanges();
      }).catch(function (error) {
        _Subcription.default.__emitError(error);

        _this12._updateCacheForError(stringifiedID || clientID, error);
      });

      return stringifiedID || clientID;
    }
  }, {
    key: "__fetchCustom",
    value: function __fetchCustom(handler, queryOptions) {
      var _this13 = this;

      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var cacheKey = this._getCacheKey(queryOptions) + key;

      if (!this._customLoaderByQuery.has(cacheKey)) {
        this._customLoaderByQuery.set(cacheKey, _LoadObject.default.loading());

        this.__emitChanges();

        this.__resolve(handler).then(function (result) {
          _this13._customLoaderByQuery.set(cacheKey, _LoadObject.default.withValue(result.data));

          _this13.__emitChanges();
        }).catch(function (error) {
          _Subcription.default.__emitError(error);

          _this13._customLoaderByQuery.set(cacheKey, _LoadObject.default.withError(error));

          _this13.__emitChanges();
        });
      }

      return (0, _nullthrows.default)(this._customLoaderByQuery.get(cacheKey));
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
      this._entityIDsLoaderByQuery = new Map();
      this._customLoaderByQuery = new Map();
      this._countLoaderByQuery = new Map();
    }
  }, {
    key: "_getCacheKey",
    value: function _getCacheKey(queryOptions) {
      return JSON.stringify(queryOptions || '_');
    }
  }, {
    key: "_updateCacheForEntity",
    value: function _updateCacheForEntity(entity) {
      var shouldEmitChanges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this._entityLoaderByID.set(entity.id.toString(), _LoadObject.default.withValue(entity));

      if (shouldEmitChanges) {
        this.__emitChanges();
      }
    }
  }, {
    key: "_updateCacheForError",
    value: function _updateCacheForError(id, error) {
      var shouldEmitChanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this._entityLoaderByID.set(id.toString(), _LoadObject.default.withError(error));

      if (shouldEmitChanges) {
        this.__emitChanges();
      }
    }
  }]);

  return ODataDAO;
}(_BaseODataDAO2.default);

_defineProperty(ODataDAO, "_clientID", 0);

var _default = ODataDAO;
exports.default = _default;