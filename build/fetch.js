'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handler = require('./handler');

var _handler2 = _interopRequireDefault(_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (path, init) {
  var _oHandler$oConfig = (0, _handler2.default)().oConfig,
      endpoint = _oHandler$oConfig.endpoint,
      _oHandler$oConfig$hea = _oHandler$oConfig.headers,
      oheaders = _oHandler$oConfig$hea === undefined ? [] : _oHandler$oConfig$hea;


  if (!endpoint) {
    throw new Error('no-ohandler-endpoint');
  }

  var headers = new Headers();
  oheaders.forEach(function (_ref) {
    var name = _ref.name,
        value = _ref.value;
    return headers.append(name, value);
  });

  return fetch(endpoint + '/' + path, Object.assign({ headers: headers }, init));
};