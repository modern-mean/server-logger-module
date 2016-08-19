'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MMLogger = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MMLogger {

  constructor(config) {
    this.transports = [];
    if (config.winston.file !== 'false') {
      this.transports.push(new _winston2.default.transports.File({ filename: config.winston.file }));
    }

    if (config.winston.console === 'true') {
      this.transports.push(new _winston2.default.transports.Console());
    }

    this.logger = new _winston2.default.Logger({
      level: config.winston.level,
      transports: this.transports
    });
  }

  get() {
    return this.logger;
  }

}
exports.MMLogger = MMLogger;