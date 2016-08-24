'use strict';

import winston from 'winston';
import { merge } from 'lodash';

export class MMLogger {

  constructor(config) {

    this.config = config || {
      winston: {
        file: 'false',
        console: 'true',
        level: 'info'
      }
    };

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
