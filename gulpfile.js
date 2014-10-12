var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');

gulp.task('copyTraceurRunTime', function () {
    return gulp.src('node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('traceurNode', function () {
    return gulp.src('src/nodeTest.js')
        .pipe(sourcemaps.init())
        .pipe(traceur({
        	sourceMaps: true,
        	modules: 'commonjs'
      	 }))
        .pipe(concat('nodeTest.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('traceurBrowser', function () {
    return gulp.src('src/greeter.js')
        .pipe(sourcemaps.init())
        .pipe(traceur({
        	sourceMaps: true,
        	modules: 'commonjs'
      	 }))
        .pipe(concat('browserTest.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['traceurNode', 'traceurBrowser', 'copyTraceurRunTime']);