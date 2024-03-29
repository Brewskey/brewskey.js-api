"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nullthrows = _interopRequireDefault(require("nullthrows"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
/**
 * A secret key that is used to prevent direct construction of these objects,
 * this is effectively used to ensure that the constructor is private.
 */
var SECRET = "SECRET_".concat(Math.random());
var VALUES_TO_CACHE = [undefined, null, false, true, 0, ''];
var CACHE = new Map(VALUES_TO_CACHE.map(function (value) {
  return [value, new Map([[true, new Map()], [false, new Map()]])];
}));

/**
 * Immutable Load Object. This is an immutable object that represents a
 * particular point in time for a request. Some examples:
 *
 * Render spinners while loading:
 *
 *   if (loadObject.isLoading()) {
 *     return <Spinner />;
 *   }
 *   return <div>...</div>;
 *
 * Render errors with an error:
 *
 *   if (loadObject.hasError()) {
 *     return <ErrorBox error={loadObject.getError()} />;
 *   }
 *   return <div>...</div>;
 *
 * Render normally when there's a value:
 *
 *   return <div>{loadObject.getValue().text}</div>;
 *
 */
var LoadObject = /*#__PURE__*/function () {
  /**
   * Private construtor, never call this outside of this class.
   */
  function LoadObject(secret, operation, value, error, hasValue) {
    _classCallCheck(this, LoadObject);
    _defineProperty(this, "_operation", void 0);
    _defineProperty(this, "_value", void 0);
    _defineProperty(this, "_error", void 0);
    _defineProperty(this, "_hasValue", void 0);
    if (secret !== SECRET) {
      throw new Error('Construct LoadObjects using static methods such as ' + 'LoadObject.loading(), LoadObject.empty()');
    }
    this._operation = operation;
    this._value = value;
    this._error = error;
    this._hasValue = hasValue;
  }
  _createClass(LoadObject, [{
    key: "getOperation",
    value:
    // Convenient getters

    function getOperation() {
      return this._operation;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this._value;
    }
  }, {
    key: "getValueEnforcing",
    value: function getValueEnforcing() {
      if (!this.hasValue()) {
        throw new Error('Expected load object to have a value set.');
      }
      // We check hasValue and cast rather than checking if value is null so that
      // it's possible to have "null" values that are set.
      return this._value;
    }
  }, {
    key: "getError",
    value: function getError() {
      return this._error;
    }
  }, {
    key: "getErrorEnforcing",
    value: function getErrorEnforcing() {
      if (!this._error) {
        throw new Error('Expected load object to have an error set.');
      }
      return this._error;
    }
  }, {
    key: "hasOperation",
    value: function hasOperation() {
      return this._operation !== 'NONE';
    }
  }, {
    key: "hasValue",
    value: function hasValue() {
      return this._hasValue;
    }
  }, {
    key: "hasError",
    value: function hasError() {
      return !!this._error;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return !this.hasValue() && !this.hasOperation() && !this.hasError();
    }

    // Convenient setters
  }, {
    key: "setOperation",
    value: function setOperation(operation) {
      if (this._operation === operation) {
        return this;
      }
      return LoadObject._create(operation, this.getValue(), this.getError(), this.hasValue());
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (this._value === value && this._hasValue === true) {
        return this;
      }
      return LoadObject._create(this.getOperation(), value, this.getError(), this.hasValue());
    }
  }, {
    key: "setError",
    value: function setError(error) {
      if (this._error === error) {
        return this;
      }
      return LoadObject._create(this.getOperation(), this.getValue(), error, this.hasValue());
    }
  }, {
    key: "removeOperation",
    value: function removeOperation() {
      if (this._operation === 'NONE') {
        return this;
      }
      return LoadObject._create('NONE', this.getValue(), this.getError(), this.hasValue());
    }
  }, {
    key: "removeValue",
    value: function removeValue() {
      if (this._value === undefined && this._hasValue === false) {
        return this;
      }
      return LoadObject._create(this.getOperation(), undefined, this.getError(), false);
    }
  }, {
    key: "removeError",
    value: function removeError() {
      if (this._error === undefined) {
        return this;
      }
      return LoadObject._create(this.getOperation(), this.getValue(), undefined, this.hasValue());
    }
  }, {
    key: "map",
    value: function map(fn) {
      if (!this.hasValue()) {
        return this;
      }
      var output = fn(this.getValueEnforcing());
      var loader = output instanceof LoadObject ? output : this.setValue(output);
      return loader;
    }
  }, {
    key: "mapError",
    value: function mapError(fn) {
      if (!this.hasError()) {
        return this;
      }
      var output = fn(this.getErrorEnforcing());
      var loader = output instanceof LoadObject ? output : this.setValue(output);
      return loader;
    }

    //  some helper methods to check specific operations
  }, {
    key: "isDone",
    value: function isDone() {
      return !this.hasOperation();
    }
  }, {
    key: "isCreating",
    value: function isCreating() {
      return this.getOperation() === 'CREATING';
    }
  }, {
    key: "isLoading",
    value: function isLoading() {
      return this.getOperation() === 'LOADING';
    }
  }, {
    key: "isUpdating",
    value: function isUpdating() {
      return this.getOperation() === 'UPDATING';
    }
  }, {
    key: "isDeleting",
    value: function isDeleting() {
      return this.getOperation() === 'DELETING';
    }

    // Provide some helpers for mutating the operations
  }, {
    key: "done",
    value: function done() {
      return this.removeOperation();
    }
  }, {
    key: "creating",
    value: function creating() {
      return this.setOperation('CREATING');
    }
  }, {
    key: "loading",
    value: function loading() {
      return this.setOperation('LOADING');
    }
  }, {
    key: "updating",
    value: function updating() {
      return this.setOperation('UPDATING');
    }
  }, {
    key: "deleting",
    value: function deleting() {
      return this.setOperation('DELETING');
    }

    // Static helpers for creating LoadObjects
  }], [{
    key: "_create",
    value: function _create(operation, value, error, hasValue) {
      var cachedItem = LoadObject._getFromCache(operation, value, error, hasValue);
      return cachedItem || new LoadObject(SECRET, operation, value, error, hasValue);
    }
  }, {
    key: "_getFromCache",
    value: function _getFromCache(operation, value, error, hasValue) {
      if (error !== undefined || !CACHE.has(value)) {
        return null;
      }
      var operationMapByHasValue = (0, _nullthrows["default"])(CACHE.get(value));
      var loaderByOperation = (0, _nullthrows["default"])(operationMapByHasValue.get(hasValue));
      if (!loaderByOperation.has(operation)) {
        var object = new LoadObject(SECRET, operation, value, error, hasValue);
        loaderByOperation.set(operation, object);
      }
      return (0, _nullthrows["default"])(loaderByOperation.get(operation));
    }
  }, {
    key: "empty",
    value: function empty() {
      return LoadObject._create('NONE', undefined, undefined, false);
    }
  }, {
    key: "creating",
    value: function creating() {
      return LoadObject._create('CREATING', undefined, undefined, false);
    }
  }, {
    key: "loading",
    value: function loading() {
      return LoadObject._create('LOADING', undefined, undefined, false);
    }
  }, {
    key: "updating",
    value: function updating() {
      return LoadObject._create('UPDATING', undefined, undefined, false);
    }
  }, {
    key: "deleting",
    value: function deleting() {
      return LoadObject._create('DELETING', undefined, undefined, false);
    }
  }, {
    key: "withError",
    value: function withError(error) {
      return LoadObject._create('NONE', undefined, error, false);
    }
  }, {
    key: "withValue",
    value: function withValue(value) {
      if (value instanceof LoadObject) {
        return value;
      }
      return LoadObject._create('NONE', value, undefined, true);
    }
  }, {
    key: "merge",
    value: function merge(loadObjects) {
      var shouldReturnAllValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var values = [];
      var error = null;
      var operation = 'NONE';
      var hasAllValues = true;

      // eslint-disable-next-line no-restricted-syntax
      var _iterator = _createForOfIteratorHelper(loadObjects),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _loadObject = _step.value;
          if (_loadObject.hasOperation()) {
            var loadObjectOperation = _loadObject.getOperation();
            if (!shouldReturnAllValues) {
              return LoadObject.empty().setOperation(loadObjectOperation);
            }
            operation = operation || loadObjectOperation;
            values.push(_loadObject.getValue());
          } else if (_loadObject.hasError()) {
            if (!shouldReturnAllValues) {
              return LoadObject.withError(_loadObject.getErrorEnforcing());
            }
            values.push(_loadObject.getValue());
            error = error || _loadObject.getErrorEnforcing();
          } else if (_loadObject.isEmpty()) {
            values.push(undefined);
            hasAllValues = false;
          } else if (_loadObject.hasValue()) {
            values.push(_loadObject.getValueEnforcing());
          } else {
            throw new Error("This shouldn't happen");
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (!shouldReturnAllValues) {
        if (error) {
          return LoadObject.withError(error);
        }
        if (operation !== 'NONE') {
          return LoadObject.empty().setOperation(operation);
        }
        if (!hasAllValues) {
          return LoadObject.empty();
        }
      }
      var output = LoadObject.withValue(values);
      if (error) {
        output = output.setError(error);
      }
      return output.setOperation(operation);
    }
  }]);
  return LoadObject;
}();
var _default = exports["default"] = LoadObject;