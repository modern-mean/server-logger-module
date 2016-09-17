'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = () => {
  //https://github.com/winstonjs/winston
  return {
    level: process.env.LOGGERMODULE_LEVEL || 'info',
    file: process.env.LOGGERMODULE_FILE || false,
    console: process.env.LOGGERMODULE_NO_CONSOLE ? false : true
  };
};