var userValidation = require('../validators/userValidator')
var httpStatusCodes = require('../../../helpers/httpStatusCodes')
var hasher = require('../../../helpers/hasher')
var config = require('../../../config')

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

                const db = require('monk')(config.mongoUrl)
                const users = db.get('users')
                users.insert(user, function (err, response) {
                    if (err) { callback({ statusCode: httpStatusCodes.internalServerError, payload: err }); return }
                    db.close()
                    callback({ statusCode: httpStatusCodes.created, payload: user })
                });
            });
        }
    },

    listAllUsers: function (callback) {

      const db = require('monk')(config.mongoUrl)
      const users = db.get('users')
      users.find({}, function(err, docs)
      {
          if (err) { callback({ statusCode: httpStatusCodes.internalServerError, payload: err }); return }
          db.close()
          callback({ statusCode: httpStatusCodes.ok, payload: docs })
      })
    },

    getUserByUsername: function (username, callback) {

        if (!username || username == '') {

            callback({ statusCode: httpStatusCodes.badRequest, payload: 'username cannot be an empty string' })
        }
        else {
            const db = require('monk')(config.mongoUrl)
            const users = db.get('users')
            users.findOne({ username: username }, function(err, doc)
            {
                db.close()
                if (!doc) { callback({ statusCode: httpStatusCodes.notFound, payload: 'no user found with username ' + username }); return }
                callback({ statusCode: httpStatusCodes.ok, payload: doc })
            })
        }
    }
}

module.exports = userService;
