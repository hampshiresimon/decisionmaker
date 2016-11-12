var gulp = require('gulp')
var exec = require('child_process').exec
var config = require('../config').getConfig()


gulp.task('mongo-start', function () {
    exec('"' + config.mongo + '" --dbpath data --logpath logs/mongo/mongo.log', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});
