var userService = require('../services/userService')
var httpStatusCodes = require('../../../helpers/httpStatusCodes')

var authRouter = {

  postRoute : function (req, res, next) {

    userService.createNewUser(req.body, function (callback) {
        if (callback.statusCode == httpStatusCodes.badRequest) {

            res.status(httpStatusCodes.badRequest).send(callback.payload)

        } else if (callback.statusCode == httpStatusCodes.internalServerError) {

            next(callback.payload)

        } else {

            res.status(httpStatusCodes.created).json(callback.payload)
        }
    })
  },

  getRoute : function (req, res, next) {

      res.status(httpStatusCodes.ok).json(req.user)
  }
}

module.exports = authRouter
