
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {
    
    return browserify({
        entries: './js/grenin.coffee',
        transforms: ['.coffee', 'brfs']
    }).bundle()
    
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
    
});

gulp.task('watch', function () {
    gulp.watch([
        'js/*.coffee',
        'hbs/*'
    ], ['browserify']);
});

gulp.task('server', function () {
    gulp.src('.')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('default', ['browserify', 'watch', 'server']);

