'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var cssval      = require('gulp-w3c-css');
var htmlhint    = require('gulp-htmlhint');
var beautify    = require('gulp-beautify');
var babel       = require('gulp-babel');
var image       = require('gulp-image');
var uglify      = require('gulp-uglify');
var size        = require('gulp-size');
var gutil       = require('gulp-util');

// compile scss to css
gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss') 
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});

// validation of css
gulp.task('cssval', function () {
  return gulp.src('./assets/css/*.css') 
    .pipe(cssval())
    .pipe(gulp.dest('./stage/.cssval'));
});

// validation of html
gulp.task('htmlhint', function () {
  return gulp.src('./*.html') 
    .pipe(htmlhint())
    .pipe(gulp.dest('./stage/.htmlhint'));
});

// beautifies javascript
gulp.task('beautify', function () {
  return gulp.src('./assets/js/*.js') 
    .pipe(beautify())
    .pipe(gulp.dest('./stage/.js_beautify'));
});

// compiles javascript
gulp.task('babel', function () {
  return gulp.src('./assets/js/*.js') 
    .pipe( babel( { presets: ['es2015'] } ))
    .pipe(gulp.dest('./stage/.js_babel'));
});

// javascript minimizer
gulp.task('uglify', function () {
  return gulp.src('./assets/js/*.js') 
    .pipe(uglify())
    .pipe(gulp.dest('./stage/.uglify'));
});

// optimizes (shrinks) images
gulp.task('image', function () {
  return gulp.src('./assets/images/*') 
    .pipe(image())
    .pipe(gulp.dest('./stage/.images'));
});

// tells you the size of your project
gulp.task('size', function () {
  return gulp.src('./**/*') 
    .pipe(size())
    .pipe(gulp.dest('.size'));
});

gulp.task('css', ['sass', 'cssval']);

gulp.task('html', ['htmlhint']);

gulp.task('javascript', ['beautify', 'babel', 'uglify']);

gulp.task('default', ['css', 'html', 'javascript', 'image', 'size']);

//gulp.task('default', ['sass', 'cssval', 'htmlhint', 'beautify', 'babel', 'image', 'uglify', 'size']);
