var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('traceurNode', ['clean'], function () {
    return gulp.src('src/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(traceur({
            sourceMaps: true,
            modules: 'commonjs'
         }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/node'));
});

gulp.task('build', ['traceurNode']);

gulp.task('watch', function() {
  gulp.watch('src/**', ['build']);
});

gulp.task('default', ['build', 'watch']);
