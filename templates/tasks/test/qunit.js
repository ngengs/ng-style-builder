const include = require('gulp-include');
const gutil = require('gulp-util');
const qunit = require('gulp-qunit');
const mergeStream = require('merge-stream');

module.exports = {
  fn: (gulp) => {
    const runner = [];
    const scriptsConfig = global.MAIN_CONFIGURATION_FILE(2);
    scriptsConfig.test.qunit.forEach((value) => {
      const runObject = gulp.src(value.src)
        .pipe(include().on('error', gutil.log))
        .pipe(qunit({ phantomjsOptions: value.inject }));

      runner.push(runObject);
    });

    return mergeStream(runner);
  },
};
