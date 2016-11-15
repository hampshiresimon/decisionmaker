var logger = require('../helpers/logger')
var environmentTypes = require('../helpers/environmentTypes')
var httpStatusCodes = require('../helpers/httpStatusCodes')
var config = require('../config')

module.exports = function (err, req, res, next) {

    logger.error(err)

    var configEntries = config.getConfig()

    if (configEntries.environment == environmentTypes.production) {
        res.status(err.status || httpStatusCodes.internalServerError).json({ message: err.message })
    } else {
        res.status(err.status || httpStatusCodes.internalServerError).json({ message: err.message, error: err })
    }
}
