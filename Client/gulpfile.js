var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var wait = require('gulp-wait')
var stylus = require('gulp-stylus')
var jade = require('gulp-jade')
var data = require('gulp-data')
var nodemon = require('gulp-nodemon')
var babel = require('gulp-babel');
var config = require('./config')


gulp.task('dev', ['watch:js', 'watch:css', 'watch:jade', 'node'])


gulp.task('js', function () {
    gulp.src(['javascript/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(babel({
            presets: ['es2015','react']
        }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:js', ['js'], function () {
    gulp.watch('javascript/**/*.js', ['js'])
})

gulp.task('css', function () {
    gulp.src('css/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:css', ['css'], function () {
    gulp.watch('css/**/*.styl', ['css'])
})

gulp.task('jade:main', function () {
    gulp.src('jade/main.jade')
    .pipe(data( function(file) {
                     return config;
                   } ))
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('jade:templates', function () {
    gulp.src(['jade/**/*.jade', '!jade/main.jade'])
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('templates'))
})

gulp.task('watch:jade', ['jade:main', 'jade:templates'], function () {
    gulp.watch('jade/**/*.jade', ['jade:main', 'jade:templates'])
})

gulp.task('node', function () {
    nodemon({
        script: 'client.js',
        exec: 'node',
        ext: 'js',
        ignore: 'gulp*'
    })
})
