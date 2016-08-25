'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MMLogger = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _lodash = require('lodash');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MMLogger {

  constructor(config) {
    this.config = config || _config2.default;

    this.transports = [];

    if (this.config.winston.file !== 'false') {
      this.transports.push(new _winston2.default.transports.File({ filename: this.config.winston.file }));
    }

    if (this.config.winston.console === 'true') {
      this.transports.push(new _winston2.default.transports.Console());
    }

    this.logger = new _winston2.default.Logger({
      level: this.config.winston.level,
      transports: this.transports
    });
  }

  get() {
    return this.logger;
  }

  getConfig() {
    return this.config;
  }

}
exports.MMLogger = MMLogger;