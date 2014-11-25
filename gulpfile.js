var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify');


gulp.task('compress', function() {
  gulp.src('js/script.dist.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/map'))
});

gulp.task('lint',function() {
  return gulp.src('js/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('scripts', ['compress'],function(){ var bundler = browserify({
	entries: ['./js/src/script.js'] });
	return bundler.bundle()
	.on('error', function(err) {
		console.log(err.message); this.emit('end');

		gutil.beep();
	})
	.pipe(source('script.dist.js')) .pipe(gulp.dest('./js'));
});


gulp.task('default', function(){
	var watcher = gulp.watch('js/src/**/*.js', ['lint','scripts']); 
	watcher.on('change', function(event) {
		['scripts']
		
	}); 
});
