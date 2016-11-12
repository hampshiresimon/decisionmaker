var config = require('../config').getConfig()
var httpStatusCodes = require('../helpers/httpStatusCodes')
var jwt = require('jwt-simple')
var userService = require('../controllers/api/services/userService')

module.exports = function (req, res, next) {

    // exclude the auth and user create
    if (req.path == '/api/auth' || ( req.path == '/api/users' && req.method == 'POST')) { return next(); }

    var token = req.headers['x-auth']

    if (token) {
        try {
            var decoded = jwt.decode(token, config.secretKey);

            if (decoded.expires <= Date.now()) {
                res.status(httpStatusCodes.forbidden).send('Access token has expired')
                return
            }

            userService.getUserByUsername(decoded.username, function(callback)
            {
                if (callback.statusCode == httpStatusCodes.ok) {
                    req.user = callback.payload
                    return next()
                } else {
                    res.status(httpStatusCodes.forbidden).send(callback.payload)
                    return
                }
            })

        } catch (err) {
            res.status(httpStatusCodes.forbidden).send('invalid x-auth token')
        }
    } else {
        res.status(httpStatusCodes.forbidden).send('no x-auth token present')
    }
}
