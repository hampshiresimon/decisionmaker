var router = require('express').Router()
var authRouter = require('./routers/authRouter')

router.post('/', authRouter.postRoute)

module.exports = router
