"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subcription = function () {
  function Subcription() {
    _classCallCheck(this, Subcription);

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.__emitChanges = this.__emitChanges.bind(this);
    this._subscriptions = new Set();
  }

  _createClass(Subcription, [{
    key: "subscribe",
    value: function subscribe(handler) {
      this._subscriptions.add(handler);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(handler) {
      this._subscriptions.delete(handler);
    }
  }, {
    key: "__emitChanges",
    value: function __emitChanges() {
      this._subscriptions.forEach(function (handler) {
        return handler();
      });
    }
  }]);

  return Subcription;
}();

exports.default = Subcription;