const mergeStream = require('merge-stream');
const gutil = require('gulp-util');
const include = require('gulp-include');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');

module.exports = {
  fn: (gulp) => {
    const runner = [];
    const stylesConfig = global.MAIN_CONFIGURATION_FILE(1);
    stylesConfig.styles.forEach((value) => {
      const runObject = gulp.src(value.src)
        .pipe(include().on('error', gutil.log))
        .pipe(sourcemaps.init({ largeFile: true }))
        .pipe(less({
          strictMath: 'on',
          banner: global.MAIN_BANNER_COMMENT,
        }))
        .pipe(cleanCSS({
          compatibility: 'ie8',
          keepSpecialComments: '*',
          advanced: false,
          format: 'keep-breaks',
        }))
        .pipe(autoprefixer({
          browsers: global.MAIN_CONFIG_BRIDGE.config.autoprefixerBrowsers,
        }))
        .pipe(csscomb({ config: 'less/.csscomb.json' }))
        .pipe(rename(global.MAIN_OUTPUT_FILE_NAME(value.output, 'css')))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${global.MAIN_BUILD_OUTPUT_DIR}/css/`));

      runner.push(runObject);
    });

    return mergeStream(runner);
  },
};
