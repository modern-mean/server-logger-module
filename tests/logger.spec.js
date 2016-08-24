'use strict';

import { MMLogger } from '../src/logger.es6';
import winston from 'winston';


let sandbox,
  loggerTest,
  config;

describe('/src/logger.js', () => {

  beforeEach(() => {
    config = {
      winston: {
        level:  'info', //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
        file: './logs/all.log',
        console: 'true'
      }
    }
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('constructor', () => {

    it('should be an object', () => {
      loggerTest = new MMLogger(config);
      return loggerTest.should.be.an('object');
    });

    describe('config', () => {

      describe('level', () => {

        it('should set level based on config', () => {
          config.winston.level = 'silly';
          loggerTest = new MMLogger(config);
          return loggerTest.get().level.should.be.equal('silly');
        });

      });

      describe('console', () => {

        it('should add console transport', () => {
          loggerTest = new MMLogger(config);
          return loggerTest.get().transports.console.should.be.an('object');
        });

        it('should not add console transport', () => {
          config.winston.console = 'false';
          loggerTest = new MMLogger(config);
          return expect(loggerTest.get().transports.console).to.not.exist;
        });

      });

      describe('file', () => {

        it('should add file transport', () => {
          loggerTest = new MMLogger(config);
          return loggerTest.get().transports.file.should.be.an('object');
        });

        it('should not add file transport', () => {
          config.winston.file = 'false';
          loggerTest = new MMLogger(config);
          return expect(loggerTest.get().transports.file).to.not.exist;
        });

      });

    });

  });

  describe('get', () => {

    beforeEach(() => {
      loggerTest = new MMLogger(config);
    });

    it('should return winston object', () => {
      return loggerTest.get().debug.should.be.a('function');
    });

  });

});
