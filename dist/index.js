'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _module = require('./module');

Object.keys(_module).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module[key];
    }
  });
});