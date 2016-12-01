var router = require('express').Router()
var stateRouter = require('./routers/stateRouter')

router.post('/', stateRouter.postRoute)

module.exports = router
