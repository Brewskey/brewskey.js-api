'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

var _ClientID = require('./ClientID');

var _ClientID2 = _interopRequireDefault(_ClientID);

var _Subcription = require('./Subcription');

var _Subcription2 = _interopRequireDefault(_Subcription);

var _LoadObject = require('../LoadObject');

var _LoadObject2 = _interopRequireDefault(_LoadObject);

var _fetch = require('../fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RestDAO = function (_Subscription) {
  _inherits(RestDAO, _Subscription);

  function RestDAO() {
    var _ref;

    var _temp, _temp2, _this, _ret;

    _classCallCheck(this, RestDAO);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_temp2 = (_this = _possibleConstructorReturn(this, (_ref = RestDAO.__proto__ || Object.getPrototypeOf(RestDAO)).call.apply(_ref, [this].concat(args))), _this), _this.__delete = _this.__delete.bind(_this), _this.__fetchMany = _this.__fetchMany.bind(_this), _this.__fetchOne = _this.__fetchOne.bind(_this), _this.__fetchOnce = _this.__fetchOnce.bind(_this), _this.__post = _this.__post.bind(_this), _this.__put = _this.__put.bind(_this), _this.flushCache = _this.flushCache.bind(_this), _this.flushCacheForEntity = _this.flushCacheForEntity.bind(_this), _this.flushQueryCaches = _this.flushQueryCaches.bind(_this), _this._flushQueryCaches = _this._flushQueryCaches.bind(_this), _this.__getCacheKey = _this.__getCacheKey.bind(_this), _this._updateCacheForEntity = _this._updateCacheForEntity.bind(_this), _this._updateCacheForError = _this._updateCacheForError.bind(_this), _temp2), _this._entityLoaderById = new Map(), _this._entityIdsLoaderByQuery = new Map(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RestDAO, [{
    key: '__delete',
    value: function __delete(path, id, queryParams) {
      var _this2 = this;

      var clientId = _ClientID2.default.getClientId();
      var stringifiedId = id.toString();

      var entity = this._entityLoaderById.get(stringifiedId) || _LoadObject2.default.empty();
      this._entityLoaderById.set(stringifiedId, entity.deleting());

      this._entityLoaderById.set(clientId, _LoadObject2.default.empty().deleting());
      this.__emitChanges();

      (0, _fetch2.default)(path, _extends({ method: 'DELETE' }, queryParams)).then(function () {
        _this2._entityLoaderById.delete(id);
        _this2._entityLoaderById.delete(clientId);
        _this2._flushQueryCaches();
        _this2.__emitChanges();
      }).catch(function (error) {
        _this2._updateCacheForError(clientId, error);
      });

      return clientId;
    }
  }, {
    key: '__fetchMany',
    value: function __fetchMany(path, queryParams) {
      var _this3 = this;

      var cacheKey = this.__getCacheKey(path, queryParams);

      if (!this._entityIdsLoaderByQuery.has(cacheKey)) {
        this._entityIdsLoaderByQuery.set(cacheKey, _LoadObject2.default.loading());
        this.__emitChanges();

        (0, _fetch2.default)(path, _extends({ method: 'GET' }, queryParams)).then(function (items) {
          // todo items should be an array from api but now its null
          if (!items) {
            items = []; // eslint-disable-line
          }
          var ids = items.map(function (_ref2) {
            var id = _ref2.id;
            return id;
          });

          items.forEach(function (item) {
            return _this3._entityLoaderById.set(item.id, _LoadObject2.default.withValue(item));
          });

          _this3._entityIdsLoaderByQuery.set(cacheKey, _LoadObject2.default.withValue(ids));
          _this3.__emitChanges();
        }).catch(function (error) {
          _this3._entityIdsLoaderByQuery.set(cacheKey, _LoadObject2.default.withError(error));
          _this3.__emitChanges();
        });
      }

      return (0, _nullthrows2.default)(this._entityIdsLoaderByQuery.get(cacheKey)).map(function (ids) {
        return ids.map(function (id) {
          return (0, _nullthrows2.default)(_this3._entityLoaderById.get(id.toString()));
        });
      });
    }
  }, {
    key: '__fetchOne',
    value: function __fetchOne(path, id, queryParams) {
      var _this4 = this;

      var stringifiedId = id.toString();

      if (!this._entityLoaderById.has(stringifiedId)) {
        this._entityLoaderById.set(stringifiedId, _LoadObject2.default.loading());
        this.__emitChanges();

        (0, _fetch2.default)(path, _extends({
          headers: [{ name: 'Accept', value: 'application/json' }, { name: 'Content-Type', value: 'application/json' }],
          method: 'GET'
        }, queryParams)).then(this._updateCacheForEntity).catch(function (error) {
          _this4._updateCacheForError(stringifiedId, error);
        });
      }

      return (0, _nullthrows2.default)(this._entityLoaderById.get(stringifiedId));
    }
  }, {
    key: '__fetchOnce',
    value: function __fetchOnce(path, queryParams) {
      var _this5 = this;

      var clientId = _ClientID2.default.getClientId();

      this._entityLoaderById.set(clientId, _LoadObject2.default.loading());
      this.__emitChanges();

      (0, _fetch2.default)(path, _extends({ method: 'GET' }, queryParams)).then(this._updateCacheForEntity).catch(function (error) {
        _this5._updateCacheForError(clientId, error);
      });

      return (0, _nullthrows2.default)(this._entityLoaderById.get(clientId));
    }
  }, {
    key: '__post',
    value: function __post(path, mutator, queryParams) {
      var _this6 = this;

      var clientId = _ClientID2.default.getClientId();
      this._entityLoaderById.set(clientId, _LoadObject2.default.creating());

      (0, _fetch2.default)(path, _extends({
        body: JSON.stringify(mutator),
        headers: [{ name: 'Accept', value: 'application/json' }, { name: 'Content-Type', value: 'application/json' }],
        method: 'POST'
      }, queryParams)).then(function (item) {
        _this6._flushQueryCaches();
        _this6._updateCacheForEntity(item, false);
        _this6._entityLoaderById.set(clientId, (0, _nullthrows2.default)(_this6._entityLoaderById.get(item.id)));
        _this6.__emitChanges();
      }).catch(function (error) {
        _this6._entityLoaderById.set(clientId, _LoadObject2.default.withError(error));
        _this6.__emitChanges();
      });

      return clientId;
    }
  }, {
    key: '__put',
    value: function __put(path, id, mutator, queryParams) {
      var _this7 = this;

      var stringifiedID = id.toString();
      var entity = this._entityLoaderById.get(stringifiedID) || _LoadObject2.default.empty();
      this._entityLoaderById.set(stringifiedID, entity.updating());

      var clientId = _ClientID2.default.getClientId();
      this._entityLoaderById.set(clientId, entity.updating());

      this.__emitChanges();

      (0, _fetch2.default)(path, _extends({
        body: JSON.stringify(mutator),
        headers: [{ name: 'Accept', value: 'application/json' }, { name: 'Content-Type', value: 'application/json' }]
      }, queryParams)).then(function (item) {
        _this7._flushQueryCaches();
        _this7._updateCacheForEntity(item, false);
        // The clientID has a reference to the load object
        _this7._entityLoaderById.set(clientId, (0, _nullthrows2.default)(_this7._entityLoaderById.get(item.id)));
        _this7.__emitChanges();
      }).catch(function (error) {
        _this7._updateCacheForError(clientId, error);
      });

      return clientId;
    }
  }, {
    key: 'flushCache',
    value: function flushCache() {
      this._entityLoaderById = new Map();
      this._flushQueryCaches();
      this.__emitChanges();
    }
  }, {
    key: 'flushCacheForEntity',
    value: function flushCacheForEntity(entityId) {
      this._entityLoaderById.delete(entityId);
      this.__emitChanges();
    }
  }, {
    key: 'flushQueryCaches',
    value: function flushQueryCaches() {
      this._flushQueryCaches();
      this.__emitChanges();
    }
  }, {
    key: '_flushQueryCaches',
    value: function _flushQueryCaches() {
      this._entityIdsLoaderByQuery = new Map();
    }
  }, {
    key: '__getCacheKey',
    value: function __getCacheKey(path, queryParams) {
      return path + JSON.stringify(queryParams || '_');
    }
  }, {
    key: '_updateCacheForEntity',
    value: function _updateCacheForEntity(entity) {
      var shouldEmitChanges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this._entityLoaderById.set(entity.id.toString(), _LoadObject2.default.withValue(entity));
      if (shouldEmitChanges) {
        this.__emitChanges();
      }
    }
  }, {
    key: '_updateCacheForError',
    value: function _updateCacheForError(id, error) {
      var shouldEmitChanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this._entityLoaderById.set(id.toString(), _LoadObject2.default.withError(error));
      if (shouldEmitChanges) {
        this.__emitChanges();
      }
    }
  }]);

  return RestDAO;
}(_Subcription2.default);

exports.default = RestDAO;