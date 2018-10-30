'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

var _BaseDAO2 = require('./BaseDAO');

var _BaseDAO3 = _interopRequireDefault(_BaseDAO2);

var _LoadObject = require('../LoadObject');

var _LoadObject2 = _interopRequireDefault(_LoadObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DAO = function (_BaseDAO) {
  _inherits(DAO, _BaseDAO);

  function DAO() {
    var _ref;

    var _temp, _temp2, _this, _ret;

    _classCallCheck(this, DAO);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_temp2 = (_this = _possibleConstructorReturn(this, (_ref = DAO.__proto__ || Object.getPrototypeOf(DAO)).call.apply(_ref, [this].concat(args))), _this), _this.deleteByID = _this.deleteByID.bind(_this), _this.count = _this.count.bind(_this), _this.__countCustom = _this.__countCustom.bind(_this), _this.fetchByID = _this.fetchByID.bind(_this), _this.fetchByIDs = _this.fetchByIDs.bind(_this), _this.fetchMany = _this.fetchMany.bind(_this), _this.fetchSingle = _this.fetchSingle.bind(_this), _this.flushCache = _this.flushCache.bind(_this), _this.flushCacheForEntity = _this.flushCacheForEntity.bind(_this), _this.flushCustomCache = _this.flushCustomCache.bind(_this), _this.flushQueryCaches = _this.flushQueryCaches.bind(_this), _this.patch = _this.patch.bind(_this), _this.post = _this.post.bind(_this), _this.put = _this.put.bind(_this), _this.subscribe = _this.subscribe.bind(_this), _this.unsubscribe = _this.unsubscribe.bind(_this), _this.waitForLoaded = _this.waitForLoaded.bind(_this), _this.__mutateCustom = _this.__mutateCustom.bind(_this), _this.__fetchCustom = _this.__fetchCustom.bind(_this), _this._emitChanges = _this._emitChanges.bind(_this), _this._flushQueryCaches = _this._flushQueryCaches.bind(_this), _this._getCacheKey = _this._getCacheKey.bind(_this), _this._updateCacheForEntity = _this._updateCacheForEntity.bind(_this), _this._updateCacheForError = _this._updateCacheForError.bind(_this), _temp2), _this._countLoaderByQuery = new Map(), _this._entityIDsLoaderByQuery = new Map(), _this._customLoaderByQuery = new Map(), _this._entityLoaderByID = new Map(), _this._subscriptions = new Set(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DAO, [{
    key: 'deleteByID',
    value: function deleteByID(id) {
      var _this2 = this;

      var stringifiedID = id.toString();
      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject2.default.empty();
      this._entityLoaderByID.set(stringifiedID, entity.deleting());
      this._emitChanges();

      return this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID)),
      /* params */{}, 'delete').then(function () {
        _this2._entityLoaderByID.delete(id);
        _this2._flushQueryCaches();
        _this2._emitChanges();
      }).catch(function (error) {
        _BaseDAO3.default.__handleError(error);
        _this2._updateCacheForError(stringifiedID, error);
      });
    }
  }, {
    key: 'count',
    value: function count(queryOptions) {
      var _this3 = this;

      return this.__countCustom(function (countQueryOptions) {
        return _this3.__buildHandler(_extends({}, queryOptions, countQueryOptions));
      }, queryOptions);
    }
  }, {
    key: '__countCustom',
    value: function __countCustom(getOHandler, queryOptions) {
      var _this4 = this;

      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var cacheKey = this._getCacheKey(queryOptions) + key;

      if (!this._countLoaderByQuery.has(cacheKey)) {
        this._countLoaderByQuery.set(cacheKey, _LoadObject2.default.loading());
        this._emitChanges();

        this.__resolve(getOHandler({
          shouldCount: true,
          take: 0
        })).then(function (result) {
          _this4._countLoaderByQuery.set(cacheKey, _LoadObject2.default.withValue(result.inlinecount));
          _this4._emitChanges();
        }).catch(function (error) {
          _BaseDAO3.default.__handleError(error);
          var loader = _this4._countLoaderByQuery.get(cacheKey);
          _this4._countLoaderByQuery.set(cacheKey, loader ? loader.setError(error) : _LoadObject2.default.withError(error));
          _this4._emitChanges();
        });
      }

      return (0, _nullthrows2.default)(this._countLoaderByQuery.get(cacheKey));
    }
  }, {
    key: 'fetchByID',
    value: function fetchByID(id) {
      var _this5 = this;

      var stringifiedID = id.toString();
      if (!this._entityLoaderByID.has(stringifiedID)) {
        this._entityLoaderByID.set(stringifiedID, _LoadObject2.default.loading());
        this._emitChanges();
        this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID))).then(function (result) {
          return _this5._updateCacheForEntity(result);
        }).catch(function (error) {
          _BaseDAO3.default.__handleError(error);
          _this5._updateCacheForError(stringifiedID, error);
        });
      }

      return (0, _nullthrows2.default)(this._entityLoaderByID.get(stringifiedID));
    }
  }, {
    key: 'fetchByIDs',
    value: function fetchByIDs(ids) {
      var _this6 = this;

      var stringifiedIds = ids.map(String);
      var idsToLoad = stringifiedIds.filter(function (id) {
        return !_this6._entityLoaderByID.has(id);
      });

      if (idsToLoad.length) {
        idsToLoad.forEach(function (id) {
          _this6._entityLoaderByID.set(id.toString(), _LoadObject2.default.loading());
        });

        // This URI will look like `pours/Default.GetManyByIDs(ids=['58','59'])/`
        var handler = this.__buildHandler();
        handler.customParam('ids', idsToLoad.map(this.__reformatIDValue).join(','));

        this.__resolveMany(handler).then(function (results) {
          var entitiesByID = new Map(results.map(function (item) {
            return [item.id, item];
          }));

          idsToLoad.forEach(function (id) {
            var entity = entitiesByID.get(id);
            if (entity) {
              _this6._updateCacheForEntity(entity, false);
            } else {
              _this6._updateCacheForError(id, new Error('Could not load ' + _this6.getEntityName() + ' ' + id.toString()));
            }
          });

          _this6._emitChanges();
        }).catch(function (error) {
          _BaseDAO3.default.__handleError(error);
          stringifiedIds.forEach(function (id) {
            return _this6._updateCacheForError(id, error, false);
          });

          _this6._emitChanges();
        });
      }

      return new Map(stringifiedIds.map(function (id) {
        return [id, (0, _nullthrows2.default)(_this6._entityLoaderByID.get(id))];
      }));
    }
  }, {
    key: 'fetchMany',
    value: function fetchMany(queryOptions) {
      var _this7 = this;

      var cacheKey = this._getCacheKey(queryOptions);

      if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
        this._entityIDsLoaderByQuery.set(cacheKey, _LoadObject2.default.loading());
        this._emitChanges();

        var handler = this.__buildHandler(queryOptions, false);
        handler = handler.select('id');

        this.__resolveManyIDs(handler).then(function (ids) {
          var stringifiedIds = ids.map(String);
          _this7._entityIDsLoaderByQuery.set(cacheKey, _LoadObject2.default.withValue(stringifiedIds));
          _this7._emitChanges();
          _this7.fetchByIDs(stringifiedIds);
        }).catch(function (error) {
          _BaseDAO3.default.__handleError(error);
          var loader = _this7._entityIDsLoaderByQuery.get(cacheKey);
          _this7._entityIDsLoaderByQuery.set(cacheKey, loader ? loader.setError(error) : _LoadObject2.default.withError(error));
          _this7._emitChanges();
        });
      }

      return (0, _nullthrows2.default)(this._entityIDsLoaderByQuery.get(cacheKey)).map(function (ids) {
        var resultMap = _this7.fetchByIDs(ids);
        return ids.map(function (id) {
          return (0, _nullthrows2.default)(resultMap.get(id.toString()));
        });
      });
    }
  }, {
    key: 'fetchSingle',
    value: function fetchSingle(queryOptions) {
      var combinedQueryOptions = _extends({
        orderBy: [{ column: 'id', direction: 'desc' }]
      }, queryOptions, {
        take: 1
      });

      return this.fetchMany(combinedQueryOptions).map(function (items) {
        return items[0] || _LoadObject2.default.empty();
      });
    }
  }, {
    key: 'flushCache',
    value: function flushCache() {
      this._entityLoaderByID = new Map();
      this._flushQueryCaches();
      this._emitChanges();
    }
  }, {
    key: 'flushCacheForEntity',
    value: function flushCacheForEntity(entityID) {
      this._entityLoaderByID.delete(entityID);
      this._emitChanges();
    }
  }, {
    key: 'flushCustomCache',
    value: function flushCustomCache() {
      this._customLoaderByQuery = new Map();
      this._emitChanges();
    }
  }, {
    key: 'flushQueryCaches',
    value: function flushQueryCaches() {
      this._flushQueryCaches();
      this._emitChanges();
    }
  }, {
    key: 'patch',
    value: function patch(id, mutator) {
      var _this8 = this;

      var stringifiedID = id.toString();
      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject2.default.empty();
      this._entityLoaderByID.set(stringifiedID, entity.updating());
      this._emitChanges();

      return this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID)), this.getTranslator().toApi(mutator), 'patch').then(function (result) {
        _this8._flushQueryCaches();
        _this8._updateCacheForEntity(result);
      }).catch(function (error) {
        _BaseDAO3.default.__handleError(error);
        _this8._updateCacheForError(stringifiedID, error);
      });
    }
  }, {
    key: 'post',
    value: function post(mutator) {
      var _this9 = this;

      DAO._clientID += 1;
      var clientID = 'CLIENT_ID:' + DAO._clientID;
      this._entityLoaderByID.set(clientID, _LoadObject2.default.loading());
      this.__resolveSingle(this.__buildHandler(), this.getTranslator().toApi(mutator), 'post').then(function (result) {
        _this9._flushQueryCaches();
        _this9._updateCacheForEntity(result, false);
        // The clientID has a reference to the load object
        _this9._entityLoaderByID.set(clientID, (0, _nullthrows2.default)(_this9._entityLoaderByID.get(result.id)));
        _this9._emitChanges();
      }).catch(function (error) {
        _BaseDAO3.default.__handleError(error);
        _this9._entityLoaderByID.set(clientID, _LoadObject2.default.withError(error));
        _this9._emitChanges();
      });
      return clientID;
    }
  }, {
    key: 'put',
    value: function put(id, mutator) {
      var _this10 = this;

      var stringifiedID = id.toString();
      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject2.default.empty();
      this._entityLoaderByID.set(stringifiedID, entity.updating());
      this._emitChanges();

      return this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(stringifiedID)), this.getTranslator().toApi(mutator), 'put').then(function (result) {
        _this10._updateCacheForEntity(result);
      }).catch(function (error) {
        _BaseDAO3.default.__handleError(error);
        _this10._updateCacheForError(stringifiedID, error);
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(handler) {
      this._subscriptions.add(handler);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(handler) {
      this._subscriptions.delete(handler);
    }
  }, {
    key: 'waitForLoaded',
    value: function waitForLoaded(fn) {
      var _this11 = this;

      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return reject(new Error('Timeout!'));
        }, timeout);

        var fetchAndResolve = function fetchAndResolve() {
          var loader = fn();
          if (loader.isLoading() || loader.isUpdating()) {
            return;
          }

          loader = fn().map(function (result) {
            if (!Array.isArray(result)) {
              return result;
            }

            if (result.some(function (item) {
              return item instanceof _LoadObject2.default ? item.isLoading() : false;
            })) {
              return _LoadObject2.default.loading();
            }

            return result;
          });

          if (loader.isLoading()) {
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
    key: '__mutateCustom',
    value: function __mutateCustom(handler, method, id, mutator) {
      var _this12 = this;

      var stringifiedID = null;
      if (id) {
        stringifiedID = id.toString();
      }

      DAO._clientID += 1;
      var clientID = 'CLIENT_ID:' + DAO._clientID;

      var entity = this._entityLoaderByID.get(stringifiedID || clientID) || _LoadObject2.default.empty();

      if (method === 'delete') {
        this._entityLoaderByID.set(stringifiedID || clientID, entity.deleting());
      } else {
        this._entityLoaderByID.set(stringifiedID || clientID, entity.updating());
      }
      this._emitChanges();

      this.__resolve(handler, mutator, method).then(function (result) {
        if (id) {
          // We want whatever uses this store to refetch the entity
          _this12._entityLoaderByID.delete(stringifiedID);
        } else {
          _this12._updateCacheForEntity(result, false);
          _this12._entityLoaderByID.set(clientID, (0, _nullthrows2.default)(_this12._entityLoaderByID.get(result.id)));
        }
        _this12._emitChanges();
      }).catch(function (error) {
        _BaseDAO3.default.__handleError(error);
        _this12._updateCacheForError(stringifiedID || clientID, error);
      });

      return id ? stringifiedID : clientID;
    }
  }, {
    key: '__fetchCustom',
    value: function __fetchCustom(handler, queryOptions) {
      var _this13 = this;

      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var cacheKey = this._getCacheKey(queryOptions) + key;

      if (!this._customLoaderByQuery.has(cacheKey)) {
        this._customLoaderByQuery.set(cacheKey, _LoadObject2.default.loading());
        this._emitChanges();

        this.__resolve(handler).then(function (result) {
          _this13._customLoaderByQuery.set(cacheKey, _LoadObject2.default.withValue(result.data));
          _this13._emitChanges();
        }).catch(function (error) {
          _BaseDAO3.default.__handleError(error);
          _this13._customLoaderByQuery.set(cacheKey, _LoadObject2.default.withError(error));
          _this13._emitChanges();
        });
      }

      return (0, _nullthrows2.default)(this._customLoaderByQuery.get(cacheKey));
    }
  }, {
    key: '_emitChanges',
    value: function _emitChanges() {
      this._subscriptions.forEach(function (handler) {
        return handler();
      });
    }
  }, {
    key: '_flushQueryCaches',
    value: function _flushQueryCaches() {
      this._entityIDsLoaderByQuery = new Map();
      this._customLoaderByQuery = new Map();
      this._countLoaderByQuery = new Map();
    }
  }, {
    key: '_getCacheKey',
    value: function _getCacheKey(queryOptions) {
      return JSON.stringify(queryOptions || '_');
    }
  }, {
    key: '_updateCacheForEntity',
    value: function _updateCacheForEntity(entity) {
      var shouldEmitChanges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this._entityLoaderByID.set(entity.id.toString(), _LoadObject2.default.withValue(entity));
      if (shouldEmitChanges) {
        this._emitChanges();
      }
    }
  }, {
    key: '_updateCacheForError',
    value: function _updateCacheForError(id, error) {
      var shouldEmitChanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this._entityLoaderByID.set(id.toString(), _LoadObject2.default.withError(error));
      if (shouldEmitChanges) {
        this._emitChanges();
      }
    }
  }]);

  return DAO;
}(_BaseDAO3.default);

DAO._clientID = 0;
exports.default = DAO;