var router = require('express').Router()
var userRouter = require('./routers/userRouter')

router.post('/', userRouter.postRoute)
router.get('/', userRouter.getRoute)

module.exports = router
