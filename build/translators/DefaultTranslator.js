"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var deepIdCast = function deepIdCast(node) {
  Object.keys(node).forEach(function (key) {
    if (node[key] === Object(node[key])) {
      deepIdCast(node[key]);
    }

    if (key === 'id') {
      // eslint-disable-next-line
      node[key] = node[key].toString();
    }
  });
  return node;
};

var DefaultTranslator =
/*#__PURE__*/
function () {
  function DefaultTranslator() {
    _classCallCheck(this, DefaultTranslator);
  }

  _createClass(DefaultTranslator, [{
    key: "fromApi",
    value: function fromApi(apiValue) {
      return deepIdCast(apiValue);
    }
  }, {
    key: "toApi",
    value: function toApi(mutator) {
      return mutator;
    }
  }, {
    key: "toForm",
    value: function toForm(model) {
      return model;
    }
  }]);

  return DefaultTranslator;
}();

var _default = DefaultTranslator;
exports.default = _default;