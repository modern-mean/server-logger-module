import winston from 'winston';
import defaults from 'lodash.defaultsdeep';
import defaultConfig from './config';

export class LoggerModule {

  constructor(config) {
    this.config = defaults(config, defaultConfig());

    this.transports = [];

    if (this.config.winston.file !== 'false') {
      this.transports.push(new (winston.transports.File)({ filename: this.config.winston.file }));
    }

    if (this.config.winston.console === 'true') {
      this.transports.push(new (winston.transports.Console)());
    }

    this.logger = new (winston.Logger)({
      level: this.config.winston.level,
      transports: this.transports
    });

  }

  get() {
    return this.logger;
  }

}
