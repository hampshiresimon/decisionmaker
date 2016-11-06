var logger = require('../helpers/logger')

module.exports = function (req, res, next) {

    logger.trace(req)
    next()

}