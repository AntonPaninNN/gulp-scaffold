var gulp = require("gulp"),
    cssBase64 = require("gulp-css-base64"),
    concatJs = require("gulp-concat"),
    concatCss = require("gulp-concat-css"),
    cssMin = require("gulp-cssmin"),
    htmlMin = require("gulp-htmlmin"),
    rename = require("gulp-rename"),
    uglifyJs = require("gulp-uglify"),
    clean = require('gulp-clean');

// Styles
gulp.task("styles", function() {
    return gulp.src('src/css/*.css')
                    .pipe(cssBase64({
                        baseDir: '../img/',
                        maxWeightResource: 1000000,
                        extensionsAllowed: ['.gif', '.jpg']
                        }))
                    .pipe(concatCss('bundle.min.css'))
                    .pipe(cssMin())
                    .pipe(gulp.dest('prod/'));
});

// Scripts
gulp.task("scripts", function() {
    return gulp.src('src/js/*.js')
                    .pipe(concatJs('bundle.min.js'))
                    .pipe(uglifyJs())
                    .pipe(gulp.dest('prod/'));
});

// HTML
gulp.task("html", function() {
    return gulp.src('src/*.html')
                    .pipe(htmlMin({collapseWhitespace: true}))
                    .pipe(gulp.dest('prod/'));
});

// Clean
gulp.task('clean', function() {
    return gulp.src('prod/', {read: false})
      .pipe(clean());
});

// Default
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'html');
});