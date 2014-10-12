var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');

gulp.task('copyTraceurRunTime', function () {
    return gulp.src('node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['copyTraceurRunTime'], function () {
    return gulp.src('src/*.js')
        .pipe(sourcemaps.init())
        .pipe(traceur())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});