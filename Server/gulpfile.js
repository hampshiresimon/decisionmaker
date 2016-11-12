var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var fs = require('fs')
var exec = require('child_process').exec;
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
    require('./gulp/' + task)
})


gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('set-test-node-env', function() {
    return process.env.NODE_ENV = 'test';
});

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

gulp.task('unittests', function() {
    return gulp
    .src(['test/**/*.test.js'])
    .pipe(babel({
            presets: ['es2015']
        }))
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha())
})

gulp.task('watch:unittests', ['unittests'], function () {
    gulp.watch('test/**/*.test.js', ['unittests'])
})


gulp.task('integrationtests', function() {
    return gulp
    .src(['test/**/*.integration.js'])
    .pipe(babel({
            presets: ['es2015']
        }))
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha())
})

gulp.task('watch:integrationtests', ['set-test-node-env','mongo-start','integrationtests'], function () {
    gulp.watch('test/**/*.integration.js', ['integrationtests'])
})
