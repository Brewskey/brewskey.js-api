'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _odata = require('odata');

var _odata2 = _interopRequireDefault(_odata);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _odata2.default)().config({
  endpoint: _config2.default.host + 'api/v2',
  headers: [{ name: 'Prefer', value: 'return=representation' }]
});

exports.default = _odata2.default;