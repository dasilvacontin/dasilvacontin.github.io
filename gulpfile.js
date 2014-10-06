
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

gulp.task('default', function() {
    
    gulp.run('browserify');
    gulp.watch('js/grenin.coffee', function() {
        console.log('\nchange detected!');
        gulp.run('browserify');
    });
    
    gulp.src('.')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
    
});
