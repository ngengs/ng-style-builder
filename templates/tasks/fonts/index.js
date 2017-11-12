const gutil = require('gulp-util');
const include = require('gulp-include');
const flatten = require('gulp-flatten');

module.exports = (gulp) => {
  return gulp.src('fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(include().on('error', gutil.log))
    .pipe(flatten())
    .pipe(gulp.dest('dist/fonts'));
};
