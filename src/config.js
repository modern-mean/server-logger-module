export default () => {
  //https://github.com/winstonjs/winston
  return {
    winston: {
      level:  process.env.MM_LOG_LEVEL || 'info', //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
      file: process.env.MM_LOG_FILE || 'false',
      console: process.env.MM_LOG_CONSOLE || 'true'
    }
  };
};
