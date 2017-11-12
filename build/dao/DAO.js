'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

var _odata = require('odata');

var _odata2 = _interopRequireDefault(_odata);

var _BaseDAO2 = require('./BaseDAO');

var _BaseDAO3 = _interopRequireDefault(_BaseDAO2);

var _LoadObject = require('../load_object/LoadObject');

var _LoadObject2 = _interopRequireDefault(_LoadObject);

var _constants = require('../constants');

var _filters = require('../filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CHUNK_SIZE = 20;
var ID_REG_EXP = /\bid\b/;

var DAO = function (_BaseDAO) {
  _inherits(DAO, _BaseDAO);

  function DAO(config) {
    _classCallCheck(this, DAO);

    var _this = _possibleConstructorReturn(this, (DAO.__proto__ || Object.getPrototypeOf(DAO)).call(this, config));

    _this.deleteByID = _this.deleteByID.bind(_this);
    _this.count = _this.count.bind(_this);
    _this.fetchByID = _this.fetchByID.bind(_this);
    _this.fetchByIDs = _this.fetchByIDs.bind(_this);
    _this.fetchMany = _this.fetchMany.bind(_this);
    _this.flushCache = _this.flushCache.bind(_this);
    _this.patch = _this.patch.bind(_this);
    _this.post = _this.post.bind(_this);
    _this.put = _this.put.bind(_this);
    _this.subscribe = _this.subscribe.bind(_this);
    _this.unsubscribe = _this.unsubscribe.bind(_this);
    _this._emitChanges = _this._emitChanges.bind(_this);
    _this._clearQueryCaches = _this._clearQueryCaches.bind(_this);
    _this._getCacheKey = _this._getCacheKey.bind(_this);
    _this._updateCacheForEntity = _this._updateCacheForEntity.bind(_this);
    _this._updateCacheForError = _this._updateCacheForError.bind(_this);
    _this._entityLoaderByID = new Map();
    _this._entityIDsLoaderByQuery = new Map();
    _this._countLoaderByQuery = new Map();
    _this._subscribers = [];
    return _this;
  }

  _createClass(DAO, [{
    key: 'deleteByID',
    value: function deleteByID(id) {
      var _this2 = this;

      id = id.toString();
      var entity = this._entityLoaderByID.get(id);
      if (!entity) {
        return;
      }

      this._entityLoaderByID.set(id, entity.deleting());
      this._emitChanges();

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(id)), null, 'delete').then(function () {
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
          count: true,
          take: 0
        }))).then(function (result) {
          // TODO - test this... it should be a number in the object
          _this3._countLoaderByQuery.set(cacheKey, _LoadObject2.default.withValue(result.data));
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

      id = id.toString();
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
        return !_this5._entityLoaderByID.has(id.toString());
      });
      ids = ids.map(function (id) {
        return id.toString();
      });

      if (idsToLoad.length) {
        idsToLoad.forEach(function (id) {
          return _this5._entityLoaderByID.set(id.toString(), _LoadObject2.default.loading());
        });
        for (var ii = 0; ii < idsToLoad.length; ii += CHUNK_SIZE) {
          var queryOptions = {
            filters: [(0, _filters.createFilter)('id').equals(idsToLoad.slice(ii, ii + CHUNK_SIZE))]
          };
          this.__resolveMany(this.__buildHandler(queryOptions)).then(function (results) {
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

        var handler = this.__buildHandler(queryOptions,
        /* shouldSelectExpand */false);
        handler = handler.select('id');
        this.__resolveManyIDs(handler).then(function (ids) {
          _this6._entityIDsLoaderByQuery.set(cacheKey, _LoadObject2.default.withValue(ids));
          _this6._emitChanges();
          return _this6.fetchByIDs(ids);
        }).catch(function (error) {
          var loader = _this6._entityIDsLoaderByQuery.get(cacheKey);
          _this6._entityIDsLoaderByQuery.set(cacheKey, loader ? loader.setError(error) : _LoadObject2.default.withError(error));
          _this6._emitChanges();
        });
      }

      return (0, _nullthrows2.default)(this._entityIDsLoaderByQuery.get(cacheKey)).map(function (ids) {
        var resultMap = _this6.fetchByIDs(ids);
        return ids.map(function (id) {
          return (0, _nullthrows2.default)(resultMap.get(id.toString()));
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

      id = id.toString();
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
      var _this8 = this;

      this.__resolveSingle(this.__buildHandler(), this.getTranslator().toApi(mutator), 'post').then(function (result) {
        _this8._clearQueryCaches();
        _this8._updateCacheForEntity(result);
      }).catch(function () {
        return _this8._emitChanges();
      });
    }
  }, {
    key: 'put',
    value: function put(id, mutator) {
      var _this9 = this;

      id = id.toString();
      var entity = this._entityLoaderByID.get(id);
      if (entity) {
        this._entityLoaderByID.set(id, entity.updating());
        this._emitChanges();
      }

      this.__resolveSingle(this.__buildHandler().find(this.__reformatIDValue(id)), this.getTranslator().toApi(mutator), 'put').then(function (result) {
        _this9._clearQueryCaches();
        _this9._updateCacheForEntity(result);
      }).catch(function (error) {
        return _this9._updateCacheForError(id, error);
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(fn) {
      if (this._subscribers.includes(fn)) {
        return;
      }
      this._subscribers.push(fn);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(fn) {
      this._subscribers = this._subscribers.filter(function (item) {
        return item !== fn;
      });
    }
  }, {
    key: '_emitChanges',
    value: function _emitChanges() {
      // TODO - stores should somehow subscribe to refetch when there are changes
    }
  }, {
    key: '_clearQueryCaches',
    value: function _clearQueryCaches() {
      this._entityIDsLoaderByQuery = new Map();
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
      var should_emitChanges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this._entityLoaderByID.set(entity.id.toString(), _LoadObject2.default.withValue(entity));
      should_emitChanges && this._emitChanges();
    }
  }, {
    key: '_updateCacheForError',
    value: function _updateCacheForError(id, error) {
      var should_emitChanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      id = id.toString();
      var loader = this._entityLoaderByID.get(id);
      this._entityLoaderByID.set(id, loader ? loader.setError(error) : _LoadObject2.default.withError(error));
      should_emitChanges && this._emitChanges();
    }
  }]);

  return DAO;
}(_BaseDAO3.default);

exports.default = DAO;