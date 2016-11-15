var authService = require('../services/authService')
var httpStatusCodes = require('../../../helpers/httpStatusCodes')

var authRouter = {

  postRoute : function (req, res, next) {

    authService.createToken(req.body, function (callback) {
        if (callback.statusCode == httpStatusCodes.badRequest) {

            res.status(httpStatusCodes.badRequest).send(callback.payload)
        } else if (callback.statusCode == httpStatusCodes.internalServerError) {

            next(callback.payload)
        } else if ( callback.statusCode == httpStatusCodes.notFound) {

            res.status(httpStatusCodes.notFound).send(callback.payload)
        } else {

            res.status(httpStatusCodes.ok).json(callback.payload)
        }
    })
  }
}

module.exports = authRouter
