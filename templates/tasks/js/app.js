const babel = require('gulp-babel');
const rename = require('gulp-rename');
const header = require('gulp-header');
const mergeStream = require('merge-stream');
const uglify = require('gulp-uglify');

module.exports = {
  fn: (gulp) => {
    let runner = [];
    const scriptsConfig = global.MAIN_CONFIGURATION_FILE(2);
    scriptsConfig.scripts.forEach((value) => {
      let runObject = gulp.src(value.src)
        .pipe(babel())
        .pipe(rename({prefix: `${global.MAIN_PACKAGE_NAME}-`}))
        .pipe(header(`${global.MAIN_BANNER_COMMENT}`))
        .pipe(gulp.dest(`${global.MAIN_BUILD_OUTPUT_DIR}/js`))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({
          compress: {
            warnings: false,
          },
          mangle: true,
          output: {comments: /^!|@preserve|@license|@cc_on/i},
        }))
        .pipe(gulp.dest(`${global.MAIN_BUILD_OUTPUT_DIR}/js`));

      runner.push(runObject);
    });

    return mergeStream(runner);
  }
};
