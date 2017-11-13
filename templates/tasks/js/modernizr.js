const include = require('gulp-include');
const modernizr = require('gulp-modernizr');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

module.exports = {
  fn: gulp => gulp.src('./js/*.js')
    .pipe(include().on('error', gutil.log))
    .pipe(modernizr(global.MAIN_OUTPUT_FILE_NAME('modernizr', 'js'), {
      crawl: false,
      customTests: [],
      tests: [
        'flexbox',
        'flexwrap',
      ],
      classPrefix: '',
      options: [
        'testAllProps',
        'setClasses',
      ],
    }))
    .pipe(gulp.dest(`${global.MAIN_BUILD_OUTPUT_DIR}/js`))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(`${global.MAIN_BUILD_OUTPUT_DIR}/js`)),
};
