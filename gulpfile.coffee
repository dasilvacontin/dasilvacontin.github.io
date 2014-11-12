
gulp = require 'gulp'
webserver = require 'gulp-webserver'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
uglify = require 'gulp-uglify'

gulp.task 'browserify', ->
    
    browserify {
        entries: './js/grenin.coffee',
        transforms: ['.coffee', 'brfs']
    }
    .bundle()
    
    .pipe source 'bundle.js'
    .pipe buffer()
    .pipe uglify()
    .pipe gulp.dest './js/'

gulp.task 'watch', ->
    gulp.watch [
        'js/*.coffee',
        'hbs/*'
    ], ['browserify']

gulp.task 'server', ->
    gulp.src '.'
    .pipe webserver {
        port: 8080,
        livereload: true,
        open: true
    }

gulp.task 'default', ['browserify', 'watch', 'server']

