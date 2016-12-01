var stateService = require('../services/stateService')
var httpStatusCodes = require('../../../helpers/httpStatusCodes')

var stateRouter = {

  postRoute : function (req, res, next) {

    stateService.save(req.body, req.user, function (callback) {

        if (callback.statusCode == httpStatusCodes.internalServerError) {
          next(callback.payload)
        } else if ( callback.statusCode == httpStatusCodes.ok){
          res.status(httpStatusCodes.ok).json(callback.payload)
        } else {
          res.status(callback.statusCode).send(callback.payload)
        }
    })
  }
}

module.exports = stateRouter
