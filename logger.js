var log4js = require('log4js');

log4js.configure({
    appenders: { weather_app: { type: 'file', filename: 'server.log' } },
    categories: { default: { appenders: ['weather_app'], level: 'info' } }
  });

  const logger = log4js.getLogger('weather_app');


  module.exports = {
    logger
  };

