var userService = require('./services/userService')
var router = require('express').Router()
var httpStatusCodes = require('../../helpers/httpStatusCodes')

router.post('/', function (req, res, next) {

    userService.createNewUser(req.body, function (callback) {
        if (callback.statusCode == httpStatusCodes.badRequest) {

            res.status(httpStatusCodes.badRequest).send(callback.payload)

        } else if (callback.statusCode == httpStatusCodes.internalServerError) {

            next(callback.payload)

        } else {

            res.status(httpStatusCodes.created).json(callback.payload)
        }
    })
})

router.get('/', function (req, res, next) {

    userService.listAllUsers(function (callback) {

        if (callback.statusCode == httpStatusCodes.internalServerError) {

            next(callback.payload)
        } else {
            res.status(httpStatusCodes.ok).json(callback.payload)
        }
    })
})

router.get('/current', function (req, res, next) {

    res.status(httpStatusCodes.ok).json(req.user)
})

module.exports = router
