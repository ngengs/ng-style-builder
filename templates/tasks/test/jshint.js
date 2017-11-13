const include = require('gulp-include');
const gutil = require('gulp-util');
const jshint = require('gulp-jshint');
const mergeStream = require('merge-stream');

module.exports = {
  fn: (gulp) => {
    const runner = [];
    const scriptsConfig = global.MAIN_CONFIGURATION_FILE(2);
    scriptsConfig.test.jshint.forEach((value) => {
      const runObject = gulp.src(value.src)
        .pipe(include().on('error', gutil.log))
        .pipe(jshint(value.config))
        .pipe(jshint.reporter('default'));

      runner.push(runObject);
    });

    return mergeStream(runner);
  },
};
