'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _odata = require('odata');

var _odata2 = _interopRequireDefault(_odata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (path, options) {
  var _oHandler$oConfig = (0, _odata2.default)().oConfig,
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

  (options && options.headers || []).forEach(function (_ref2) {
    var name = _ref2.name,
        value = _ref2.value;
    return headers.append(name, value);
  });

  return fetch(endpoint + '/' + path, _extends({}, options, { headers: headers })).then(function (response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }).then(function (response) {
    return response.json();
  });
};