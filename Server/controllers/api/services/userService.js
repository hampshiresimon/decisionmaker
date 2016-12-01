var userValidation = require('../validators/userValidator')
var httpStatusCodes = require('../../../helpers/httpStatusCodes')
var hasher = require('../../../helpers/hasher')
var dataCollections = require('../../../helpers/dataCollections')
var jwt = require('jwt-simple')
var moment = require('moment')
var config = require('../../../config').getConfig()


var userService = {

  createNewUser: function (request, callback) {

    var _this = this
    var validationResult = userValidation.validate(request)
    if (!validationResult.isValid) {

      callback({ statusCode: httpStatusCodes.badRequest, payload: validationResult.error })
      return
    }
    else {

      var user = request;
      var nonHashedPassword = user.password

      hasher.hash(user.password, function (err, password) {
        if (err) { callback({ statusCode: httpStatusCodes.internalServerError, payload: err }); return }
        user.password = password

        var userCollection = dataCollections.getUsers()
        var users = userCollection.collection

        // check if the username already exists
        users.findOne({ username: user.username }, function(err, doc)
        {
          if (err) {
            userCollection.database.close()
            callback({ statusCode: httpStatusCodes.internalServerError, payload: err })
            return
          }

          if(doc)
          {
            userCollection.database.close()
            callback( { statusCode: 409, payload : 'username already exists' })
            return
          }

          users.insert(user, function (insertErr, insertResponse) {
            userCollection.database.close()
            if (insertErr) { callback({ statusCode: httpStatusCodes.internalServerError, payload: insertErr }); return }

            // create a token for the user
            _this.createToken( { username : user.username, password : nonHashedPassword }, function(response)
            {
              if( response.statusCode == httpStatusCodes.ok)
              {
                callback({ statusCode: httpStatusCodes.created, payload: response.payload })
                return
              }

              callback(response)
              return
            })
          })
        })
      })
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

  getUserByUsername: function (username, includeState, callback) {

    if (!username || username == '') {

      callback({ statusCode: httpStatusCodes.badRequest, payload: 'username cannot be an empty string' })
    }
    else {
      var userCollection = dataCollections.getUsers()
      var users = userCollection.collection
      users.findOne({ username: username }, { state : includeState }, function(err, doc)
      {
        userCollection.database.close()
        if (err) { callback({ statusCode: httpStatusCodes.internalServerError, payload: err }); return }
        if (!doc) { callback({ statusCode: httpStatusCodes.notFound, payload: 'no user found with username ' + username }); return }
        callback({ statusCode: httpStatusCodes.ok, payload: doc })
      })
    }
  },

  createToken: function (request, callback) {

    var _this = this
    var validationResult = userValidation.validateAuth(request);

    if (!validationResult.isValid) {

      callback({ statusCode: httpStatusCodes.badRequest, payload: validationResult.error })
      return
    }
    else {

      // we do not need the state for token creation
      _this.getUserByUsername(request.username, false, function (userServiceCallback) {
        // if we don't have OK then bubble the callback
        if (userServiceCallback.statusCode != httpStatusCodes.ok) {
          callback(userServiceCallback)
          return
        }

        try {

          hasher.compare(request.password, userServiceCallback.payload.password, function (err, valid) {

            if (err) { callback({ statusCode: httpStatusCodes.internalServerError, payload: err }); return }
            if (!valid) { callback({ statusCode: httpStatusCodes.badRequest, payload: 'incorrect password supplied for username ' + request.username }); return }

            var expires = moment().add(7, 'days').valueOf();
            var token = jwt.encode({ username: request.username, expires: expires }, config.secretKey)

            callback({ statusCode: httpStatusCodes.ok, payload: { token : token }})
            return
          })
        }
        catch (err) {
          callback({ statusCode: httpStatusCodes.internalServerError, payload: err })
        }
      })
    }
  }
}

module.exports = userService;
