const concat = require('gulp-concat');
const pump = require('pump');
const rename = require('gulp-rename');
const header = require('gulp-header');
const uglify = require('gulp-uglify');


module.exports = {
  fn: (gulp, callback) => {
    const scriptsConfig = global.MAIN_CONFIGURATION_FILE(2);
    pump([
      gulp.src(scriptsConfig.core),
      concat(global.MAIN_OUTPUT_FILE_NAME('core', 'js')),
      header(`${global.MAIN_BANNER_COMMENT}
      \n${global.MAIN_CONFIG_BRIDGE.config.jqueryCheck.join('\n')}
      \n${global.MAIN_CONFIG_BRIDGE.config.jqueryVersionCheck.join('\n')}`),
      gulp.dest(`${global.MAIN_BUILD_OUTPUT_DIR}/js`),
      rename({suffix: '.min'}),
      uglify({
        compress: {
          warnings: false,
        },
        mangle: true,
        output: {comments: /^!|@preserve|@license|@cc_on/i},
      }),
      gulp.dest(`${global.MAIN_BUILD_OUTPUT_DIR}/js`),
    ], callback);
  }
};
