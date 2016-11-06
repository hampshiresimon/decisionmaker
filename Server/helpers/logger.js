var bunyan = require('bunyan')
var config = require('../config')

/*
"fatal" (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
"error" (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
"warn" (40): A note on something that should probably be looked at by an operator eventually.
"info" (30): Detail on regular operation.
"debug" (20): Anything else, i.e. too verbose to be included in "info" level.
"trace" (10): Logging from external libraries used by your app or very detailed application logging.
*/

var logger = bunyan.createLogger({
    name: config.applicationName,
    serializers: bunyan.stdSerializers,
    level: config.logLevel,
    streams: [{
        type: 'rotating-file',
        path: config.logLocation,
        period: '1d',   // daily rotation
        count: 3        // keep 14 back copies
    }]
});

module.exports = logger
