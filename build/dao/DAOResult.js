"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DAOResult = function DAOResult(data, count, error) {
  var _this = this;

  _classCallCheck(this, DAOResult);

  this.count = function () {
    return _this._error ? null : _this._count;
  };

  this.getData = function () {
    return _this._error ? null : _this._data;
  };

  this.getError = function () {
    return _this._error;
  };

  this._count = count;
  this._data = data;
  this._error = error;
};

exports.default = DAOResult;