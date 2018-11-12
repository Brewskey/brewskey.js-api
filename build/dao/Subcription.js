"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscription = function () {
  function Subscription() {
    _classCallCheck(this, Subscription);

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.__emitChanges = this.__emitChanges.bind(this);
    this._dataSubscriptions = new Set();
  }

  _createClass(Subscription, [{
    key: "subscribe",
    value: function subscribe(handler) {
      this._dataSubscriptions.add(handler);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(handler) {
      this._dataSubscriptions.delete(handler);
    }
  }, {
    key: "__emitChanges",
    value: function __emitChanges() {
      this._dataSubscriptions.forEach(function (handler) {
        return handler();
      });
    }
  }], [{
    key: "__emitError",
    value: function __emitError(error) {
      Subscription._errorSubscriptions.forEach(function (handler) {
        return handler(error);
      });
    }
  }]);

  return Subscription;
}();

Subscription._errorSubscriptions = new Set();

Subscription.onError = function (handler) {
  Subscription._errorSubscriptions.add(handler);
};

exports.default = Subscription;