'use strict';

import winston from 'winston';

export class MMLogger {

  constructor(config) {
    this.transports = [];
    if (config.winston.file !== 'false') {
      this.transports.push(new (winston.transports.File)({ filename: config.winston.file }));
    }

    if (config.winston.console === 'true') {
      this.transports.push(new (winston.transports.Console)());
    }

    this.logger = new (winston.Logger)({
      level: config.winston.level,
      transports: this.transports
    });

  }

  get() {
    return this.logger;
  }

}
