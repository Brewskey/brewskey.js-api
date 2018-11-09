"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CloudDeviceDAO = function () {
  function CloudDeviceDAO() {
    _classCallCheck(this, CloudDeviceDAO);

    this.get = this.get.bind(this);
    this.flash = this.flash.bind(this);
    this.ping = this.ping.bind(this);
  }

  _createClass(CloudDeviceDAO, [{
    key: "get",

    // api/v2/cloud-devices/{particleID}
    value: function get() {}

    // put
    // api/v2/cloud-devices/{particleID}/flash

  }, {
    key: "flash",
    value: function flash() {}

    // put
    // api/v2/cloud-devices/{particleID}/ping

  }, {
    key: "ping",
    value: function ping() {}
  }]);

  return CloudDeviceDAO;
}();

exports.default = CloudDeviceDAO;