import { LoggerModule } from '../src/module';
import { ConfigModule } from '@modern-mean/server-config-module';
import defaultConfig from '../src/config';
import winston from 'winston';


let sandbox,
  moduleTest,
  configModule,
  config;

describe('/src/module.js', () => {

  beforeEach(() => {
    config = {
      level:  'info', //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
      file: './logs/all.log',
      console: 'true'
    };
    configModule = new ConfigModule({ LoggerModule: config });
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  describe('constructor', () => {

    it('should be an object', () => {
      moduleTest = new LoggerModule();
      return moduleTest.should.be.an('object');
    });

    describe('config', () => {

      describe('default', () => {

        it('should set default config if no config', () => {
          moduleTest = new LoggerModule();
          moduleTest.get().transports.console.should.be.an('object');
          expect(moduleTest.get().transports.file).to.not.exist;
          return moduleTest.get().level.should.be.equal('info');
        });

        it('should call defaults if passed ConfigModule', () => {
          let spy = sandbox.spy(configModule, 'defaults');
          moduleTest = new LoggerModule(configModule);
          return spy.should.have.been.calledWith({ LoggerModule: defaultConfig() });
        });

      });

      describe('level', () => {

        it('should set level based on config', () => {
          configModule.merge({ LoggerModule: { level: 'silly' } });
          moduleTest = new LoggerModule(configModule);
          return moduleTest.get().level.should.be.equal('silly');
        });

      });

      describe('console', () => {

        it('should add console transport', () => {
          moduleTest = new LoggerModule(configModule);
          return moduleTest.get().transports.console.should.be.an('object');
        });

        it('should not add console transport', () => {
          configModule.merge({ LoggerModule: { console: false } });
          moduleTest = new LoggerModule(configModule);
          return expect(moduleTest.get().transports.console).to.not.exist;
        });

      });

      describe('file', () => {

        it('should add file transport', () => {
          moduleTest = new LoggerModule(configModule);
          return moduleTest.get().transports.file.should.be.an('object');
        });

        it('should not add file transport', () => {
          configModule.merge({ LoggerModule: { file: false } });
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
