var userValidation = require('../validators/userValidator')
var httpStatusCodes = require('../../../helpers/httpStatusCodes')
var userService = require('./userService')
var jwt = require('jwt-simple')
var moment = require('moment')
var config = require('../../../config')
var hasher = require('../../../helpers/hasher')

var authService = {

    createToken: function (request, callback) {

        var validationResult = userValidation.validateAuth(request);

        if (!validationResult.isValid) {

            callback({ statusCode: httpStatusCodes.badRequest, payload: validationResult.error })
            return
        }
        else {

            userService.getUserByUsername(request.username, function (userServiceCallback) {
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

                        callback({ statusCode: httpStatusCodes.ok, payload: token })
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

module.exports = authService;
