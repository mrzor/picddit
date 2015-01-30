'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var debug = require('gulp-debug');

var source = require("vinyl-source-stream");
var reactify = require('reactify');
var watchify = require('watchify');
var browserify = require('browserify');
var coffeeify = require('coffeeify');

var PATHS = {
  dist: 'dist',
  fatlibsjs: './frontend/js/fatlibs.js',
  frontendjs: './frontend/js/main.coffee',
  frontendjsglob: 'frontend/js/**/*.js',
  frontendstatic: 'frontend/static/**/*'
}

gulp.task('frontend-js', function () {
  var b = browserify({
    debug: true, // sourcemaps
    extensions: ['.js', '.coffee', '.jsx'], // coffee <3, react <3
    cache: {}, // required by watchify
    packageCache: {}, // ditto
    fullPaths: true  // ditto
  });
  b.transform(reactify);
  b.transform(coffeeify);
  b.external("react");
  b.add(PATHS['frontendjs']);

  var bundler = watchify(b);

  bundler.on('update', function() {
    rebundle();
    livereload.changed();
  });

  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(PATHS['dist']));
  }

  return rebundle();
});

gulp.task('frontend-static', function () {
  return gulp.src(PATHS['frontendstatic'])
    .pipe(gulp.dest(PATHS['dist']));
});

gulp.task('server', ['frontend-js', 'frontend-static'], function(next) {
  // Start connect-static server
  var connect = require('connect'),
      serveStatic = require('serve-static'),
      app = connect();
  app.use(serveStatic(PATHS['dist'])).listen(process.env.PATH['PORT'] || 9000, next);

  // Watch for JS frontend changes
  // (not needed anymore with watchify)
  // gulp.watch(PATHS['frontendjsglob'], ['frontend-js']);

  // Watch for static frontend changes
  gulp.watch(PATHS['frontendstatic'], ['frontend-static']);
});

gulp.task('livereload', ['server'], function() {
  // Based on pkozlowski-opensource comment in
  // https://github.com/vohof/gulp-livereload/issues/36

  livereload.listen({silent: true});

  // fires whenever a task completes
  gulp.on('stop', function() {
    livereload.changed();
  });
});

gulp.task('dev', ['livereload']);
