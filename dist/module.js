'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggerModule = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _serverConfigModule = require('@modern-mean/server-config-module');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoggerModule {

  constructor(config) {

    if (config instanceof _serverConfigModule.ConfigModule) {
      config.defaults({ LoggerModule: (0, _config2.default)() });
      this.config = config.get().LoggerModule;
    } else {
      this.config = (0, _config2.default)();
    }

    this.transports = [];

    if (this.config.file) {
      this.transports.push(new _winston2.default.transports.File({ filename: this.config.file }));
    }

    if (this.config.console) {
      this.transports.push(new _winston2.default.transports.Console());
    }

    this.logger = new _winston2.default.Logger({
      level: this.config.level,
      transports: this.transports
    });
  }

  get() {
    return this.logger;
  }

}
exports.LoggerModule = LoggerModule;