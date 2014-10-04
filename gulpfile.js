
var browserify = require('browserify');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rimraf = require('rimraf');

gulp.task('browserify', function () {
    
    return browserify({
        entries: './js/grenin.coffee',
        transforms: ['.coffee']
    }).bundle()

    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
   
});

gulp.task('clean', function () {
    return rimraf('js/bundle.js', function () {
        console.log('clean as a whistle!');
    });
});

gulp.task('default', function() {
    gulp.run('browserify');
    gulp.watch('js/grenin.coffee', function() {
        gulp.run('browserify');
    });
});