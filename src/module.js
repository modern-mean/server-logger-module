import winston from 'winston';
import defaultConfig from './config';
import { ConfigModule } from '@modern-mean/server-config-module';

export class LoggerModule {

  constructor(config) {

    if (config instanceof ConfigModule) {
      config.defaults({ LoggerModule: defaultConfig() });
      this.config = config.get().LoggerModule;
    } else {
      this.config = defaultConfig();
    }

    this.transports = [];

    if (this.config.file) {
      this.transports.push(new (winston.transports.File)({ filename: this.config.file }));
    }

    if (this.config.console) {
      this.transports.push(new (winston.transports.Console)());
    }

    this.logger = new (winston.Logger)({
      level: this.config.level,
      transports: this.transports
    });

  }

  get() {
    return this.logger;
  }

}
