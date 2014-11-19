
gulp = require 'gulp'
gulpif = require 'gulp-if'
webserver = require 'gulp-webserver'
browserify = require 'browserify'
sass = require 'gulp-ruby-sass'
autoprefixer = require 'gulp-autoprefixer'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
uglify = require 'gulp-uglify'

shouldMinify = true

gulp.task 'browserify', ->
    browserify
        debug: true
        entries: './js/grenin.coffee'
        transforms: ['.coffee', 'brfs']
    .bundle()
    .pipe source 'bundle.js'
    .pipe gulpif shouldMinify, buffer()
    .pipe gulpif shouldMinify, uglify()
    .pipe gulp.dest './js/'

gulp.task 'sass', ->
    gulp.src 'scss/styles.scss'
    .pipe sass()
    .on 'error', (e) ->
        console.log e.message
    .pipe autoprefixer
        browsers: ['last 2 versions']
        cascade: true
    .pipe gulp.dest 'css'

gulp.task 'watch', ->
    gulp.watch [
        'js/*.coffee',
        'hbs/*'
    ], ['browserify']
    gulp.watch './scss/**.scss', ['sass']

gulp.task 'server', ->
    gulp.src '.'
    .pipe webserver
        port: 8080
        open: true

gulp.task 'default', ['browserify', 'sass', 'watch', 'server']
