const csslint = require('gulp-csslint');
const mergeStream = require('merge-stream');

module.exports = {
  fn: (gulp) => {
    const runner = [];
    const stylesConfig = global.MAIN_CONFIGURATION_FILE(1);
    stylesConfig.test.csslint.forEach((value) => {
      const runObject = gulp.src(value.src)
        .pipe(csslint(value.config));

      runner.push(runObject);
    });

    return mergeStream(runner);
  },
};
