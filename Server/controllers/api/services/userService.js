var userValidation = require('../validators/userValidator')
var httpStatusCodes = require('../../../helpers/httpStatusCodes')
var hasher = require('../../../helpers/hasher')
var dataCollections = require('../../../helpers/dataCollections')


var userService = {

    createNewUser: function (request, callback) {

        var validationResult = userValidation.validate(request)
        if (!validationResult.isValid) {

            callback({ statusCode: httpStatusCodes.badRequest, payload: validationResult.error })
            return
        }
        else {

            var user = request;

            hasher.hash(user.password, function (err, password) {
                if (err) { callback({ statusCode: httpStatusCodes.internalServerError, payload: err }); return }
                user.password = password


                var userCollection = dataCollections.getUsers()
                var users = userCollection.collection
                users.insert(user, function (err, response) {
                    userCollection.database.close()
                    if (err) { callback({ statusCode: httpStatusCodes.internalServerError, payload: err }); return }
                    callback({ statusCode: httpStatusCodes.created, payload: user })
                });
            });
        }
    },

    listAllUsers: function (callback) {

      var userCollection = dataCollections.getUsers()
      var users = userCollection.collection
      users.find({}, function(err, docs)
      {
          userCollection.database.close()
          if (err) { callback({ statusCode: httpStatusCodes.internalServerError, payload: err }); return }
          callback({ statusCode: httpStatusCodes.ok, payload: docs })
      })
    },

    getUserByUsername: function (username, callback) {

        if (!username || username == '') {

            callback({ statusCode: httpStatusCodes.badRequest, payload: 'username cannot be an empty string' })
        }
        else {
            var userCollection = dataCollections.getUsers()
            var users = userCollection.collection
            users.findOne({ username: username }, function(err, doc)
            {
                userCollection.database.close()
                if (!doc) { callback({ statusCode: httpStatusCodes.notFound, payload: 'no user found with username ' + username }); return }
                callback({ statusCode: httpStatusCodes.ok, payload: doc })
            })
        }
    }
}

module.exports = userService;
