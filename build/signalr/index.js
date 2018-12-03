"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TapHub = _interopRequireDefault(require("./hubs/TapHub"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var startAll =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(queryParams) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _TapHub.default.connect(queryParams);

          case 3:
            _context.next = 5;
            return _TapHub.default.subscribe('*');

          case 5:
            _context.next = 9;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function startAll(_x) {
    return _ref.apply(this, arguments);
  };
}();

var stopAll =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _TapHub.default.unsubscribe('*');

          case 3:
            _TapHub.default.disconnect();

            _context2.next = 8;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 6]]);
  }));

  return function stopAll() {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  startAll: startAll,
  stopAll: stopAll
};
exports.default = _default;