var config = require('../config').getConfig()
var logger = require('../helpers/logger')

var dataCollections = {

    getUsers: function () {
      const db = require('monk')(config.mongoUrl, function(err)
      {
        if(err)
        {
          logger.fatal({ msg: 'There was a problem connecting to Mongo.', err : err})
        }
      })

      const users = db.get('users')
      return { collection : users, database : db }
    },
}

module.exports = dataCollections
