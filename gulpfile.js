var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify');
	var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower()
});

gulp.task('compress', function() {
  gulp.src('js/script.dist.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/map'))
});

gulp.task('lint',function() {
  return gulp.src('js/src/**/*.js')
    .pipe(jshint())
});


gulp.task('scripts', ['compress'],function(){ var bundler = browserify({
	entries: ['./js/src/script.js'] });
	return bundler.bundle()
	.on('error', function(err) {
		console.log(err.message); this.emit('end');

		
	})
	.pipe(source('script.dist.js')) .pipe(gulp.dest('./js'));
});


gulp.task('default', ['bower'], function(){
	var watcher = gulp.watch('js/src/**/*.js', ['lint','scripts']); 
	watcher.on('change', function(event) {
		['scripts']
		
	}); 
});
