var userService = require('../services/userService')
var httpStatusCodes = require('../../../helpers/httpStatusCodes')

var authRouter = {

  postRoute : function (req, res, next) {

    userService.createNewUser(req.body, function (callback) {

      if (callback.statusCode == httpStatusCodes.internalServerError) {
        next(callback.payload)
      } else if (callback.statusCode == httpStatusCodes.created){
        res.status(httpStatusCodes.created).json(callback.payload)
      } else {
        res.status(callback.statusCode).send(callback.payload)
      }
    })
  },

  getRoute : function (req, res, next) {

    // get the user with state
    userService.getUserByUsername(req.user.username, true, function (callback)
    {
      if (callback.statusCode == httpStatusCodes.internalServerError) {
        next(callback.payload)
      } else if (callback.statusCode == httpStatusCodes.ok) {
        res.status(httpStatusCodes.ok).json(callback.payload)
      } else {
        res.status(callback.statusCode).send(callback.payload)
      }
    })
  }
}

module.exports = authRouter
