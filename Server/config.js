var configFunc = {

  getConfig : function()
  {
    var env = process.env.NODE_ENV || 'development'
    var config = require('./config.'+env);

    return config;
  }
}

module.exports = configFunc
