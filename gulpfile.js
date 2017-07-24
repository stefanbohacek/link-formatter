var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    streamify = require('gulp-streamify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    // notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sourcemaps = require('gulp-sourcemaps');

function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}


gulp.task('browser-sync', function () {
   var files = [
      'public/css/*.css',
      'public/js/*.js'
   ];

   browserSync.init(files, {
      proxy: "http://localhost:5000/",
      open: false
   });
});

gulp.task('styles', function() {
  return gulp.src('src/styles/styles.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    })).on('error', swallowError)
    .pipe(autoprefixer('last 3 version', 'android >= 3', { cascade: true })).on('error', gutil.noop)
    .pipe(gulp.dest('./public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss()).on('error', swallowError)
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
  return browserify({ debug: true })
  .transform("babelify", {presets: ["es2015"]})
  .on('error', swallowError)
  .require("./src/scripts/scripts.js", { entry: true })
  .on('error',swallowError)
  .bundle()
  .on('error',swallowError)
  .pipe(source('scripts.js'))
  .on('error', swallowError)
  .pipe(gulp.dest('./public/js'))
  .on('error',swallowError)
  .pipe(streamify(uglify()))
  .on('error',swallowError)
  .pipe(rename({suffix: '.min'}))
  .on('error',swallowError)
  .pipe(gulp.dest('./public/js'))
  .on('error',swallowError)
  .pipe(reload({stream:true}))
  .on('error', swallowError);
});

gulp.task('jslint', function(){
  return gulp.src([
      './src/scripts/**/*.js'
    ]).pipe(jshint('tests/.jshintrc'))
    .on('error',gutil.noop)
    .pipe(jshint.reporter(stylish))
    // .pipe(jshint.reporter('default'))
    .on('error', swallowError);
});

gulp.task('clean', function() {
  return gulp.src(['public/css', 'public/js'], {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.*', ['styles']);
  gulp.watch('src/scripts/**/*.*', ['jslint', 'scripts']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'jslint', 'scripts', /*'browser-sync',*/ 'watch');
});