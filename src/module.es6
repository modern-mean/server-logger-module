'use strict';

import winston from 'winston';
import { merge } from 'lodash';

export class MMLogger {

  constructor(config) {
    this.config = config || {};
    this.defaultConfig = {
      winston: {
        file: 'false',
        console: true,
        level: 'info'
      }
    }

    this.config = merge(this.defaultConfig, this.config);

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
