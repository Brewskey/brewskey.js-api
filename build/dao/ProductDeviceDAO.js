"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductDeviceDAO = function () {
  function ProductDeviceDAO() {
    _classCallCheck(this, ProductDeviceDAO);

    this.fetchMany = this.fetchMany.bind(this);
    this.fetchByID = this.fetchByID.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  _createClass(ProductDeviceDAO, [{
    key: "fetchMany",

    // api/v2/products/{idOrSlug}/devices
    value: function fetchMany() {}

    // api/v2/products/{idOrSlug}/devices/{particleID}

  }, {
    key: "fetchByID",
    value: function fetchByID() {} // + productID

    // api/v2/products/{idOrSlug}/devices

  }, {
    key: "post",
    value: function post() {}

    // api/v2/products/{idOrSlug}/devices/{particleID}

  }, {
    key: "put",
    value: function put() {}

    // api/v2/products/{idOrSlug}/devices/{particleID}

  }, {
    key: "delete",
    value: function _delete() {}
  }]);

  return ProductDeviceDAO;
}();

exports.default = ProductDeviceDAO;