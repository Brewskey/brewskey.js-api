"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductFirmwareDAO = function () {
  function ProductFirmwareDAO() {
    _classCallCheck(this, ProductFirmwareDAO);

    this.fetchByID = this.fetchByID.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  _createClass(ProductFirmwareDAO, [{
    key: "fetchByID",

    // api/v2/products/{idOrSlug}/firmware
    value: function fetchByID() {}

    // api/v2/products/{idOrSlug}/firmware

  }, {
    key: "post",
    value: function post() {}

    // api/v2/products/{idOrSlug}/firmware/{productFirmwareID}

  }, {
    key: "put",
    value: function put() {}

    // api/v2/products/{idOrSlug}/firmware/{firmwareVersion}

  }, {
    key: "delete",
    value: function _delete() {}
  }]);

  return ProductFirmwareDAO;
}();

exports.default = ProductFirmwareDAO;