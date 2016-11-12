var logger = require('../helpers/logger')
var environmentTypes = require('../helpers/environmentTypes')
var httpStatusCodes = require('../helpers/httpStatusCodes')
var config = require('../config').getConfig()

module.exports = function (err, req, res, next) {

    logger.error(err)

    if (config.environment == environmentTypes.development) {
        res.status(err.status || httpStatusCodes.internalServerError).json({ message: err.message, error: err })
    } else if (config.environment == environmentTypes.production) {
        res.status(err.status || httpStatusCodes.internalServerError).json({ message: err.message, error: {} })
    }
}
