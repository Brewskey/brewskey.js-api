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

    return _ret = (_temp = (_temp2 = (_this = _possibleConstructorReturn(this, (_ref = RestDAO.__proto__ || Object.getPrototypeOf(RestDAO)).call.apply(_ref, [this].concat(args))), _this), _this.__delete = _this.__delete.bind(_this), _this.__fetchMany = _this.__fetchMany.bind(_this), _this.__fetchOne = _this.__fetchOne.bind(_this), _this.__post = _this.__post.bind(_this), _this.__put = _this.__put.bind(_this), _this.flushCache = _this.flushCache.bind(_this), _this.flushCacheForEntity = _this.flushCacheForEntity.bind(_this), _this.flushQueryCaches = _this.flushQueryCaches.bind(_this), _this._flushQueryCaches = _this._flushQueryCaches.bind(_this), _this.__getCacheKey = _this.__getCacheKey.bind(_this), _this._updateCacheForEntity = _this._updateCacheForEntity.bind(_this), _this._updateCacheForError = _this._updateCacheForError.bind(_this), _temp2), _this._entityLoaderByID = new Map(), _this._entityIDsLoaderByQuery = new Map(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RestDAO, [{
    key: '__delete',
    value: function __delete(path, id, queryParams) {
      var _this2 = this;

      var clientID = _ClientID2.default.getClientID();
      var stringifiedID = id.toString();

      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject2.default.empty();
      this._entityLoaderByID.set(stringifiedID, entity.deleting());

      this._entityLoaderByID.set(clientID, _LoadObject2.default.empty().deleting());
      this.__emitChanges();

      (0, _fetch2.default)(path, _extends({ method: 'DELETE' }, queryParams)).then(function () {
        _this2._entityLoaderByID.delete(id);
        _this2._entityLoaderByID.delete(clientID);
        _this2._flushQueryCaches();
        _this2.__emitChanges();
      }).catch(function (error) {
        _this2._updateCacheForError(clientID, error);
      });

      return clientID;
    }
  }, {
    key: '__fetchMany',
    value: function __fetchMany(path, queryParams) {
      var _this3 = this;

      var cacheKey = this.__getCacheKey(path, queryParams);

      if (!this._entityIDsLoaderByQuery.has(cacheKey)) {
        this._entityIDsLoaderByQuery.set(cacheKey, _LoadObject2.default.loading());
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
            return _this3._entityLoaderByID.set(item.id, _LoadObject2.default.withValue(item));
          });

          _this3._entityIDsLoaderByQuery.set(cacheKey, _LoadObject2.default.withValue(ids));
          _this3.__emitChanges();
        }).catch(function (error) {
          _this3._entityIDsLoaderByQuery.set(cacheKey, _LoadObject2.default.withError(error));
          _this3.__emitChanges();
        });
      }

      return (0, _nullthrows2.default)(this._entityIDsLoaderByQuery.get(cacheKey)).map(function (ids) {
        return ids.map(function (id) {
          return (0, _nullthrows2.default)(_this3._entityLoaderByID.get(id.toString()));
        });
      });
    }
  }, {
    key: '__fetchOne',
    value: function __fetchOne(path, id, queryParams) {
      var _this4 = this;

      var stringifiedID = id.toString();

      if (!this._entityLoaderByID.has(stringifiedID)) {
        this._entityLoaderByID.set(stringifiedID, _LoadObject2.default.loading());
        this.__emitChanges();

        (0, _fetch2.default)(path, _extends({ method: 'GET' }, queryParams)).then(this._updateCacheForEntity).catch(function (error) {
          _this4._updateCacheForError(stringifiedID, error);
        });
      }

      return (0, _nullthrows2.default)(this._entityLoaderByID.get(stringifiedID));
    }
  }, {
    key: '__post',
    value: function __post(path, mutator, queryParams) {
      var _this5 = this;

      var clientID = _ClientID2.default.getClientID();
      this._entityLoaderByID.set(clientID, _LoadObject2.default.creating());

      (0, _fetch2.default)(path, _extends({
        body: JSON.stringify(mutator),
        headers: [{ name: 'Accept', value: 'application/json' }, { name: 'Content-Type', value: 'application/json' }],
        method: 'POST'
      }, queryParams)).then(function (item) {
        _this5._flushQueryCaches();
        _this5._updateCacheForEntity(item, false);
        _this5._entityLoaderByID.set(clientID, (0, _nullthrows2.default)(_this5._entityLoaderByID.get(item.id)));
        _this5.__emitChanges();
      }).catch(function (error) {
        _this5._entityLoaderByID.set(clientID, _LoadObject2.default.withError(error));
        _this5.__emitChanges();
      });

      return clientID;
    }
  }, {
    key: '__put',
    value: function __put(path, id, mutator, queryParams) {
      var _this6 = this;

      var stringifiedID = id.toString();
      var entity = this._entityLoaderByID.get(stringifiedID) || _LoadObject2.default.empty();
      this._entityLoaderByID.set(stringifiedID, entity.updating());

      var clientID = _ClientID2.default.getClientID();
      this._entityLoaderByID.set(clientID, entity.updating());

      this.__emitChanges();

      (0, _fetch2.default)(path, _extends({
        body: JSON.stringify(mutator),
        headers: [{ name: 'Accept', value: 'application/json' }, { name: 'Content-Type', value: 'application/json' }]
      }, queryParams)).then(function (item) {
        _this6._flushQueryCaches();
        _this6._updateCacheForEntity(item, false);
        // The clientID has a reference to the load object
        _this6._entityLoaderByID.set(clientID, (0, _nullthrows2.default)(_this6._entityLoaderByID.get(item.id)));
        _this6.__emitChanges();
      }).catch(function (error) {
        _this6._updateCacheForError(clientID, error);
      });

      return clientID;
    }
  }, {
    key: 'flushCache',
    value: function flushCache() {
      this._entityLoaderByID = new Map();
      this._flushQueryCaches();
      this.__emitChanges();
    }
  }, {
    key: 'flushCacheForEntity',
    value: function flushCacheForEntity(entityID) {
      this._entityLoaderByID.delete(entityID);
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
      this._entityIDsLoaderByQuery = new Map();
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

      this._entityLoaderByID.set(entity.id.toString(), _LoadObject2.default.withValue(entity));
      if (shouldEmitChanges) {
        this.__emitChanges();
      }
    }
  }, {
    key: '_updateCacheForError',
    value: function _updateCacheForError(id, error) {
      var shouldEmitChanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this._entityLoaderByID.set(id.toString(), _LoadObject2.default.withError(error));
      if (shouldEmitChanges) {
        this.__emitChanges();
      }
    }
  }]);

  return RestDAO;
}(_Subcription2.default);

exports.default = RestDAO;