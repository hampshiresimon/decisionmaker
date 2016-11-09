var config = require('../config')

var dataCollections = {

    getUsers: function () {

      const db = require('monk')(config.mongoUrl)
      const users = db.get('users')

      return { collection : users, database : db }
    },
}

module.exports = dataCollections
