'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nanoid = require('nanoid');

var _nanoid2 = _interopRequireDefault(_nanoid);

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

    return _ret = (_temp = (_temp2 = (_this = _possibleConstructorReturn(this, (_ref = DAO.__proto__ || Object.getPrototypeOf(DAO)).call.apply(_ref, [this].concat(args))), _this), _this.deleteByID = _this.deleteByID.bind(_this), _this.count = _this.count.bind(_this), _this.fetchByID = _this.fetchByID.bind(_this), _this.fetchByIDs = _this.fetchByIDs.bind(_this), _this.fetchMany = _this.fetchMany.bind(_this), _this.flushCache = _this.flushCache.bind(_this), _this.patch = _this.patch.bind(_this), _this.post = _this.post.bind(_this), _this.put = _this.put.bind(_this), _this.subscribe = _this.subscribe.bind(_this), _this.unsubscribe = _this.unsubscribe.bind(_this), _this._emitChanges = _this._emitChanges.bind(_this), _this._clearQueryCaches = _this._clearQueryCaches.bind(_this), _this._getCacheKey = _this._getCacheKey.bind(_this), _this._updateCacheForEntity = _this._updateCacheForEntity.bind(_this), _this._updateCacheForError = _this._updateCacheForError.bind(_this), _temp2), _this._countLoaderByQuery = new Map(), _this._entityIDsLoaderByQuery = new Map(), _this._entityLoaderByID = new Map(), _this._subscriptionsByID = new Map(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DAO, [{
    key: 'deleteByID',
    value: function deleteByID(id) {
      var _this2 = this;

      var entity = this._entityLoaderByID.get(id);
      if (!entity) {
        return;
      }

      this._entityLoaderByID.set(id, entity.deleting());
      this._emitChanges();

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(id)),
      /* params */{}, 'delete').then(function () {
        _this2._entityLoaderByID.delete(id);
        _this2._clearQueryCaches();
        _this2._emitChanges();
      }).catch(function (error) {
        return _this2._updateCacheForError(id, error);
      });
    }
  }, {
    key: 'count',
    value: function count(queryOptions) {
      var _this3 = this;

      var cacheKey = this._getCacheKey(queryOptions);
      if (!this._countLoaderByQuery.has(cacheKey)) {
        this._countLoaderByQuery.set(cacheKey, _LoadObject2.default.loading());
        this._emitChanges();

        this.__resolve(this.__buildHandler(_extends({}, queryOptions, {
          shouldCount: true,
          take: 0
        }))).then(function (result) {
          _this3._countLoaderByQuery.set(cacheKey, _LoadObject2.default.withValue(result.inlinecount));
          _this3._emitChanges();
        }).catch(function (error) {
          var loader = _this3._countLoaderByQuery.get(cacheKey);
          _this3._countLoaderByQuery.set(cacheKey, loader ? loader.setError(error) : _LoadObject2.default.withError(error));
          _this3._emitChanges();
        });
      }

      return (0, _nullthrows2.default)(this._countLoaderByQuery.get(cacheKey));
    }
  }, {
    key: 'fetchByID',
    value: function fetchByID(id) {
      var _this4 = this;

      if (!this._entityLoaderByID.has(id)) {
        this._entityLoaderByID.set(id, _LoadObject2.default.loading());
        this._emitChanges();
        this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(id))).then(function (result) {
          return _this4._updateCacheForEntity(result);
        }).catch(function (error) {
          return _this4._updateCacheForError(id, error);
        });
      }

      return (0, _nullthrows2.default)(this._entityLoaderByID.get(id));
    }
  }, {
    key: 'fetchByIDs',
    value: function fetchByIDs(ids) {
      var _this5 = this;

      var idsToLoad = ids.filter(function (id) {
        return !_this5._entityLoaderByID.has(id);
      });

      if (idsToLoad.length) {
        idsToLoad.forEach(function (id) {
          _this5._entityLoaderByID.set(id.toString(), _LoadObject2.default.loading());
        });

        // This URI will look like `pours/Default.GetManyByIDs(ids=['58','59'])/`
        var handler = this.__buildHandler();
        handler.customParam('ids', idsToLoad.map(this.__reformatIDValue).join(','));

        this.__resolveMany(handler).then(function (results) {
          var entitiesByID = new Map(results.map(function (item) {
            return [item.id, item];
          }));

          ids.forEach(function (id) {
            var entity = entitiesByID.get(id);
            if (entity) {
              _this5._updateCacheForEntity(entity);
            } else {
              _this5._updateCacheForError(id, new Error('Could not load ' + _this5.getEntityName() + ' ' + id));
            }
          });

          _this5._emitChanges();
        }).catch(function (error) {
          ids.forEach(function (id) {
            return _this5._updateCacheForError(id, error, false);
          });

          _this5._emitChanges();
        });
      }

      return new Map(ids.map(function (id) {
        return [id, (0, _nullthrows2.default)(_this5._entityLoaderByID.get(id))];
      }));
    }
  }, {
    key: 'fetchMany',
    value: function fetchMany(queryOptions) {
      var _this6 = this;

      var cacheKey = this._getCacheKey(queryOptions);

      if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
        this._entityIDsLoaderByQuery.set(cacheKey, _LoadObject2.default.loading());
        this._emitChanges();

        var handler = this.__buildHandler(queryOptions, false);
        handler = handler.select('id');

        this.__resolveManyIDs(handler).then(function (ids) {
          _this6._entityIDsLoaderByQuery.set(cacheKey, _LoadObject2.default.withValue(ids));
          _this6._emitChanges();
          _this6.fetchByIDs(ids);
        }).catch(function (error) {
          var loader = _this6._entityIDsLoaderByQuery.get(cacheKey);
          _this6._entityIDsLoaderByQuery.set(cacheKey, loader ? loader.setError(error) : _LoadObject2.default.withError(error));
          _this6._emitChanges();
        });
      }

      return (0, _nullthrows2.default)(this._entityIDsLoaderByQuery.get(cacheKey)).map(function (ids) {
        var resultMap = _this6.fetchByIDs(ids);
        return ids.map(function (id) {
          return (0, _nullthrows2.default)(resultMap.get(id));
        });
      });
    }
  }, {
    key: 'flushCache',
    value: function flushCache() {
      this._entityLoaderByID = new Map();
      this._entityIDsLoaderByQuery = new Map();
      this._countLoaderByQuery = new Map();
      this._emitChanges();
    }
  }, {
    key: 'patch',
    value: function patch(id, mutator) {
      var _this7 = this;

      var entity = this._entityLoaderByID.get(id);
      if (entity) {
        this._entityLoaderByID.set(id, entity.updating());
        this._emitChanges();
      }

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(id)), this.getTranslator().toApi(mutator), 'patch').then(function (result) {
        _this7._clearQueryCaches();
        _this7._updateCacheForEntity(result);
      }).catch(function (error) {
        return _this7._updateCacheForError(id, error);
      });
    }
  }, {
    key: 'post',
    value: function post(mutator) {
      this.__resolveSingle(this.__buildHandler(), this.getTranslator().toApi(mutator), 'post').then(this._clearQueryCaches).catch(this._emitChanges);
    }
  }, {
    key: 'put',
    value: function put(id, mutator) {
      var _this8 = this;

      var entity = this._entityLoaderByID.get(id);
      if (entity) {
        this._entityLoaderByID.set(id, entity.updating());
        this._emitChanges();
      }

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(id)), this.getTranslator().toApi(mutator), 'put').then(function (result) {
        _this8._clearQueryCaches();
        _this8._updateCacheForEntity(result);
      }).catch(function (error) {
        return _this8._updateCacheForError(id, error);
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(handler) {
      var subscriptionID = (0, _nanoid2.default)();
      this._subscriptionsByID.set(subscriptionID, handler);
      return subscriptionID;
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(subscriptionID) {
      this._subscriptionsByID.delete(subscriptionID);
    }
  }, {
    key: '_emitChanges',
    value: function _emitChanges() {
      this._subscriptionsByID.forEach(function (handler) {
        return handler();
      });
    }
  }, {
    key: '_clearQueryCaches',
    value: function _clearQueryCaches() {
      this._entityIDsLoaderByQuery = new Map();
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

      this._entityLoaderByID.set(entity.id, _LoadObject2.default.withValue(entity));
      if (shouldEmitChanges) {
        this._emitChanges();
      }
    }
  }, {
    key: '_updateCacheForError',
    value: function _updateCacheForError(id, error) {
      var shouldEmitChanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var loader = this._entityLoaderByID.get(id);
      this._entityLoaderByID.set(id, loader ? loader.setError(error) : _LoadObject2.default.withError(error));
      if (shouldEmitChanges) {
        this._emitChanges();
      }
    }
  }]);

  return DAO;
}(_BaseDAO3.default);

exports.default = DAO;