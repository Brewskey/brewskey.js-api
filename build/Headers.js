"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var HEADERS = [{
  name: 'timezoneOffset',
  value: new Date().getTimezoneOffset().toString()
}, {
  name: 'Prefer',
  value: 'return=representation'
}];
var _default = HEADERS;
exports.default = _default;