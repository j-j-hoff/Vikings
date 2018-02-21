var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var gulp = require('gulp');
var clean = require('gulp-clean');

var gulp = require('gulp');
var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('default', ['clean-scripts','less', 'pack-js']);

gulp.task('less', function () {
  return gulp.src('./views/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('pack-js', function () {	
	return gulp.src(['./views/scripts/components/*.js'])
    .pipe(concat('main.js'))
    .pipe(babel())
    //.pipe(minify({ ext:{ min:'.js' }, noSource: true }))
		.pipe(gulp.dest('public/js'));
});

gulp.task('clean-scripts', ['clean-css', 'clean-js']);

gulp.task('clean-css', function () {  
  return gulp.src('./public/css/*.css', {read: false})
    .pipe(clean());
});

gulp.task('clean-js', function () {
  return gulp.src('./public/js/*.js', {read: false})
    .pipe(clean());
});

gulp.task('cachebust', ['build-css', 'build-html']);

gulp.task('build-css', function () {
  return gulp.src('./public/css/main.css')
      // Awesome css stuff
      .pipe(cachebust.resources())
      .pipe(gulp.dest('./public/css'));
});

gulp.task('build-js', function () {
  return gulp.src('./public/js/main.js')
      // Awesome css stuff
      .pipe(cachebust.resources())
      .pipe(gulp.dest('./public/js'));
});

gulp.task('build-html', ['build-css', 'build-js'], function () {
  return gulp.src('./public/*.html')
      // Awesome html stuff
      .pipe(cachebust.references())
      .pipe(gulp.dest('./public/'));
});
