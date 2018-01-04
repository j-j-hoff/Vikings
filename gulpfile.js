var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

gulp.task('default', ['less', 'pack-js']);

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
