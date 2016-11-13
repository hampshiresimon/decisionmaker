var express = require('express')
var bodyParser = require('body-parser')
var config = require('./config').getConfig()
var authMiddleware = require('./middleware/auth')
var errorMiddleware = require('./middleware/error')
var logMiddleware = require('./middleware/logger')

var app = express()


// middleware
app.use(bodyParser.json())
app.use(logMiddleware);
app.use(authMiddleware);

// endpoints
app.use('/api/auth', require('./controllers/api/auth'))
app.use('/api/users', require('./controllers/api/users'))

app.use(errorMiddleware);


var server = app.listen( config.port, config.url, function()
{
    //console.log('Server listening on port', config.port)
})

module.exports = { app : app, server : server }; // for testing
