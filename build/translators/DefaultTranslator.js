'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deepIdCast = function deepIdCast(node) {
  if (Array.isArray(node)) {
    return node.map(deepIdCast);
  } else if (node && (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node.constructor === Object) {
    var newNode = {};
    Object.keys(node).forEach(function (key) {
      newNode[key] = key === 'id' ? node[key].toString() : node[key];
    });
    return newNode;
  }

  return node;
};

var DefaultTranslator = function () {
  function DefaultTranslator() {
    _classCallCheck(this, DefaultTranslator);
  }

  _createClass(DefaultTranslator, [{
    key: 'fromApi',
    value: function fromApi(apiValue) {
      return deepIdCast(apiValue);
    }
  }, {
    key: 'toApi',
    value: function toApi(mutator) {
      return mutator;
    }
  }, {
    key: 'toForm',
    value: function toForm(model) {
      return model;
    }
  }]);

  return DefaultTranslator;
}();

exports.default = DefaultTranslator;