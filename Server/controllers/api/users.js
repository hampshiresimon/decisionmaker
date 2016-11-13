var router = require('express').Router()
var userRouter = require('./routers/userRouter')

router.post('/', userRouter.postRoute)
router.get('/', userRouter.getRoute)

/*
router.get('/', function (req, res, next) {

    userService.listAllUsers(function (callback) {

        if (callback.statusCode == httpStatusCodes.internalServerError) {

            next(callback.payload)
        } else {
            res.status(httpStatusCodes.ok).json(callback.payload)
        }
    })
})
*/

module.exports = router
