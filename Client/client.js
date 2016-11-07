var express = require('express')
var config = require('./config')

var app = express()

// endpoints
app.get('/', function(req, res)
{
    res.sendfile('main.html')
})

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/bootstrap', express.static(__dirname + '/bootstrap'));

app.listen( config.port, config.url, function()
{
    console.log('Client listening on port', config.port)
})
