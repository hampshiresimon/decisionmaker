var httpStatusCodes = require('../../../helpers/httpStatusCodes')
var hasher = require('../../../helpers/hasher')
var dataCollections = require('../../../helpers/dataCollections')
var config = require('../../../config').getConfig()


var stateService = {

  save: function (request, user, callback) {

    var userCollection = dataCollections.getUsers()
    var users = userCollection.collection

    var state = request

    // find the user to update
    users.findOne({ username: user.username }, function(err, doc)
    {
      if (err) {
        userCollection.database.close()
        callback({ statusCode: httpStatusCodes.internalServerError, payload: err })
        return
      }

      users.update(doc._id, { $set : { state : state }}, function (updateErr, updateResponse) {

        userCollection.database.close()
        if (updateErr) { callback({ statusCode: httpStatusCodes.internalServerError, payload: insertErr }); return }

        callback({ statusCode : httpStatusCodes.ok })
        return
      })
    })
  }
}


module.exports = stateService;
