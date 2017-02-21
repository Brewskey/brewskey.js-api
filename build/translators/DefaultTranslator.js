'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deepIdCast = function deepIdCast(node) {
  Object.keys(node).forEach(function (key) {
    if (node[key] === Object(node[key])) {
      deepIdCast(node[key]);
    }
    if (key === 'id') {
      node[key] = node[key].toString();
    }
  });
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