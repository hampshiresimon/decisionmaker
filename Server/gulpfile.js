var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var fs = require('fs')
var exec = require('child_process').exec;
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
    require('./gulp/' + task)
})




gulp.task('dev', ['mongo-start', 'node'], function () {
})


gulp.task('node', function () {
    nodemon({
        script: 'server.js',
        exec: 'node --debug',
        ext: 'js',
        ignore: 'gulp*'
    })
})
