'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2014-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A secret key that is used to prevent direct construction of these objects,
 * this is effectively used to ensure that the constructor is private.
 */
var SECRET = 'SECRET_' + Math.random();

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

var LoadObject = function () {

  /**
   * Private construtor, never call this outside of this class.
   */
  function LoadObject(secret, operation, value, error, hasValue) {
    _classCallCheck(this, LoadObject);

    this.getOperation = this.getOperation.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getValueEnforcing = this.getValueEnforcing.bind(this);
    this.getError = this.getError.bind(this);
    this.getErrorEnforcing = this.getErrorEnforcing.bind(this);
    this.hasOperation = this.hasOperation.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.hasError = this.hasError.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setError = this.setError.bind(this);
    this.removeOperation = this.removeOperation.bind(this);
    this.removeValue = this.removeValue.bind(this);
    this.removeError = this.removeError.bind(this);
    this.map = this.map.bind(this);
    this.mapError = this.mapError.bind(this);
    this.isDone = this.isDone.bind(this);
    this.isCreating = this.isCreating.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.isUpdating = this.isUpdating.bind(this);
    this.isDeleting = this.isDeleting.bind(this);
    this.done = this.done.bind(this);
    this.creating = this.creating.bind(this);
    this.loading = this.loading.bind(this);
    this.updating = this.updating.bind(this);
    this.deleting = this.deleting.bind(this);

    if (secret !== SECRET) {
      throw new Error('Construct LoadObjects using static methods such as ' + 'LoadObject.loading(), LoadObject.empty()');
    }
    this._operation = operation;
    this._value = value;
    this._error = error;
    this._hasValue = hasValue;
  }

  _createClass(LoadObject, [{
    key: 'getOperation',


    // Convenient getters

    value: function getOperation() {
      return this._operation;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this._value;
    }
  }, {
    key: 'getValueEnforcing',
    value: function getValueEnforcing() {
      if (!this.hasValue()) {
        throw new Error('Expected load object to have a value set.');
      }
      // We check hasValue and cast rather than checking if value is null so that
      // it's possible to have "null" values that are set.
      return this._value;
    }
  }, {
    key: 'getError',
    value: function getError() {
      return this._error;
    }
  }, {
    key: 'getErrorEnforcing',
    value: function getErrorEnforcing() {
      if (!this._error) {
        throw new Error('Expected load object to have an error set.');
      }
      return this._error;
    }
  }, {
    key: 'hasOperation',
    value: function hasOperation() {
      return this._operation !== 'NONE';
    }
  }, {
    key: 'hasValue',
    value: function hasValue() {
      return this._hasValue;
    }
  }, {
    key: 'hasError',
    value: function hasError() {
      return !!this._error;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return !this.hasValue() && !this.hasOperation() && !this.hasError();
    }

    // Convenient setters

  }, {
    key: 'setOperation',
    value: function setOperation(operation) {
      if (this._operation === operation) {
        return this;
      }

      return LoadObject._create(operation, this.getValue(), this.getError(), this.hasValue());
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (this._value === value && this._hasValue === true) {
        return this;
      }
      return LoadObject._create(this.getOperation(), value, this.getError(), this.hasValue());
    }
  }, {
    key: 'setError',
    value: function setError(error) {
      if (this._error === error) {
        return this;
      }
      return LoadObject._create(this.getOperation(), this.getValue(), error, this.hasValue());
    }
  }, {
    key: 'removeOperation',
    value: function removeOperation() {
      if (this._operation === 'NONE') {
        return this;
      }
      return LoadObject._create('NONE', this.getValue(), this.getError(), this.hasValue());
    }
  }, {
    key: 'removeValue',
    value: function removeValue() {
      if (this._value === undefined && this._hasValue === false) {
        return this;
      }
      return LoadObject._create(this.getOperation(), undefined, this.getError(), false);
    }
  }, {
    key: 'removeError',
    value: function removeError() {
      if (this._error === undefined) {
        return this;
      }
      return LoadObject._create(this.getOperation(), this.getValue(), undefined, this.hasValue());
    }
  }, {
    key: 'map',
    value: function map(fn) {
      if (!this.hasValue()) {
        return this;
      }

      var output = fn(this.getValueEnforcing());

      var loader = output instanceof LoadObject ? output : this.setValue(output);

      return loader;
    }
  }, {
    key: 'mapError',
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
    key: 'isDone',
    value: function isDone() {
      return !this.hasOperation();
    }
  }, {
    key: 'isCreating',
    value: function isCreating() {
      return this.getOperation() === 'CREATING';
    }
  }, {
    key: 'isLoading',
    value: function isLoading() {
      return this.getOperation() === 'LOADING';
    }
  }, {
    key: 'isUpdating',
    value: function isUpdating() {
      return this.getOperation() === 'UPDATING';
    }
  }, {
    key: 'isDeleting',
    value: function isDeleting() {
      return this.getOperation() === 'DELETING';
    }

    // Provide some helpers for mutating the operations

  }, {
    key: 'done',
    value: function done() {
      return this.removeOperation();
    }
  }, {
    key: 'creating',
    value: function creating() {
      return this.setOperation('CREATING');
    }
  }, {
    key: 'loading',
    value: function loading() {
      return this.setOperation('LOADING');
    }
  }, {
    key: 'updating',
    value: function updating() {
      return this.setOperation('UPDATING');
    }
  }, {
    key: 'deleting',
    value: function deleting() {
      return this.setOperation('DELETING');
    }

    // Static helpers for creating LoadObjects

  }], [{
    key: '_create',
    value: function _create(operation, value, error, hasValue) {
      var cachedItem = LoadObject._getFromCache(operation, value, error, hasValue);
      return cachedItem || new LoadObject(SECRET, operation, value, error, hasValue);
    }
  }, {
    key: '_getFromCache',
    value: function _getFromCache(operation, value, error, hasValue) {
      if (error !== undefined || !CACHE.has(value)) {
        return null;
      }

      var operationMapByHasValue = (0, _nullthrows2.default)(CACHE.get(value));
      var loaderByOperation = (0, _nullthrows2.default)(operationMapByHasValue.get(hasValue));
      if (!loaderByOperation.has(operation)) {
        var object = new LoadObject(SECRET, operation, value, error, hasValue);
        loaderByOperation.set(operation, object);
      }

      return (0, _nullthrows2.default)(loaderByOperation.get(operation));
    }
  }, {
    key: 'empty',
    value: function empty() {
      return LoadObject._create('NONE', undefined, undefined, false);
    }
  }, {
    key: 'creating',
    value: function creating() {
      return LoadObject._create('CREATING', undefined, undefined, false);
    }
  }, {
    key: 'loading',
    value: function loading() {
      return LoadObject._create('LOADING', undefined, undefined, false);
    }
  }, {
    key: 'updating',
    value: function updating() {
      return LoadObject._create('UPDATING', undefined, undefined, false);
    }
  }, {
    key: 'deleting',
    value: function deleting() {
      return LoadObject._create('DELETING', undefined, undefined, false);
    }
  }, {
    key: 'withError',
    value: function withError(error) {
      return LoadObject._create('NONE', undefined, error, false);
    }
  }, {
    key: 'withValue',
    value: function withValue(value) {
      return LoadObject._create('NONE', value, undefined, true);
    }
  }, {
    key: 'merge',
    value: function merge(loadObjects) {
      var values = [];
      var error = null;
      var operation = null;

      loadObjects.forEach(function (loadObject) {
        error = error || loadObject.getError();

        if (loadObject.hasOperation()) {
          operation = operation || loadObject.getOperation();
        }

        values.push(loadObject.getValue());
      });

      if (error) {
        return LoadObject.withError(error);
      }

      if (operation) {
        return LoadObject.empty().setOperation(operation);
      }

      return LoadObject.withValue(values);
    }
  }]);

  return LoadObject;
}();

exports.default = LoadObject;