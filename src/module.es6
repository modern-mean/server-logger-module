'use strict';

import winston from 'winston';
import { merge } from 'lodash';

export class MMLogger {

  constructor(config) {
    this.config = config || {};
    this.defaultConfig = {
      winston: {
        file: 'false',
        console: 'true',
        level: 'info'
      }
    }

    this.config = merge(this.defaultConfig, this.config);
    console.log(this.config);

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
