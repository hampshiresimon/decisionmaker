var gulp = require('gulp')
var exec = require('child_process').exec
var config = require('../config')


gulp.task('mongo-start', function (cb) {
    exec('"' + config.mongo + '" --dbpath data --logpath logs/mongo/mongo.log', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
