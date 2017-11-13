const mergeStream = require('merge-stream');
const gutil = require('gulp-util');
const include = require('gulp-include');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

module.exports = (gulp) => {
  const runner = [];
  const stylesConfig = global.MAIN_CONFIGURATION_FILE(1);
  stylesConfig.styles.forEach((value) => {
    const runObject = gulp.src(`./dist/css/${global.MAIN_OUTPUT_FILE_NAME(value.output, 'css')}`)
      .pipe(include().on('error', gutil.log))
      .pipe(sourcemaps.init({ largeFile: true }))
      .pipe(cleanCSS({
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false,
      }))
      .pipe(autoprefixer({
        browsers: global.MAIN_CONFIG_BRIDGE.config.autoprefixerBrowsers,
      }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`${global.MAIN_BUILD_OUTPUT_DIR}/css/`));

    runner.push(runObject);
  });

  return mergeStream(runner);
};
