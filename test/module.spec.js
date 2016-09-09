import { LoggerModule } from '../src/module';
import winston from 'winston';


let sandbox,
  moduleTest,
  config;

describe('/src/logger.js', () => {

  beforeEach(() => {
    config = {
      winston: {
        level:  'info', //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
        file: './logs/all.log',
        console: 'true'
      }
    };
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('constructor', () => {

    it('should be an object', () => {
      moduleTest = new LoggerModule(config);
      return moduleTest.should.be.an('object');
    });

    describe('config', () => {

      describe('default', () => {

        it('should set default if no config', () => {
          moduleTest = new LoggerModule();
          moduleTest.get().transports.console.should.be.an('object');
          expect(moduleTest.get().transports.file).to.not.exist;
          return moduleTest.get().level.should.be.equal('info');
        });

      });

      describe('level', () => {

        it('should set level based on config', () => {
          config.winston.level = 'silly';
          moduleTest = new LoggerModule(config);
          return moduleTest.get().level.should.be.equal('silly');
        });

      });

      describe('console', () => {

        it('should add console transport', () => {
          moduleTest = new LoggerModule(config);
          return moduleTest.get().transports.console.should.be.an('object');
        });

        it('should not add console transport', () => {
          config.winston.console = 'false';
          moduleTest = new LoggerModule(config);
          return expect(moduleTest.get().transports.console).to.not.exist;
        });

      });

      describe('file', () => {

        it('should add file transport', () => {
          moduleTest = new LoggerModule(config);
          return moduleTest.get().transports.file.should.be.an('object');
        });

        it('should not add file transport', () => {
          config.winston.file = 'false';
          moduleTest = new LoggerModule(config);
          return expect(moduleTest.get().transports.file).to.not.exist;
        });

      });

    });

  });

  describe('get', () => {

    beforeEach(() => {
      moduleTest = new LoggerModule(config);
    });

    it('should return winston object', () => {
      return moduleTest.get().debug.should.be.a('function');
    });

  });

});
