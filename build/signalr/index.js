"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _TapHub = _interopRequireDefault(require("./hubs/TapHub"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var startAll = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    yield _TapHub["default"].connect();
    yield _TapHub["default"].subscribe('*');
  });
  return function startAll() {
    return _ref.apply(this, arguments);
  };
}();
var stopAll = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    yield _TapHub["default"].unsubscribe('*');
    _TapHub["default"].disconnect();
  });
  return function stopAll() {
    return _ref2.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  startAll: startAll,
  stopAll: stopAll,
  TapHub: _TapHub["default"]
};