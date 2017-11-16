const runSquence = require('run-sequence');
const gutil = require('gulp-util');

module.exports = {
  fn: (gulp, callback) => {
    const logger = (event) => {
      gutil.log('Watched file', gutil.colors.cyan(event.path), gutil.colors.magenta(event.type));
    };
    gulp.watch('configs/styles.json', (event) => {
      logger(event);
      runSquence(['css'], ['site:reload-assets']);
    });
    gulp.watch('configs/scripts.json', (event) => {
      logger(event);
      runSquence(['js:core', 'js:app'], ['site:reload-assets']);
    });
    gulp.watch('less/**/*.less', (event) => {
      logger(event);
      runSquence(['css'], ['site:reload-assets']);
    });
    gulp.watch('js/app/*.js', (event) => {
      logger(event);
      runSquence(['js:app'], ['site:reload-assets']);
    });
    gulp.watch('libraries/**/*', (event) => {
      logger(event);
      runSquence(['js:lib'], ['site:reload-assets']);
    });
    gulp.watch('js/bootstrap/*.js', (event) => {
      logger(event);
      runSquence(['js:core'], ['site:reload-assets']);
    });
    gulp.watch('images/**/*', (event) => {
      logger(event);
      runSquence(['images'], ['site:reload-assets']);
    });
    gulp.watch('fonts/**/*', (event) => {
      logger(event);
      runSquence(['fonts'], ['site:reload-assets']);
    });
    gulp.watch(['views/**/*', 'data/*.json'], (event) => {
      logger(event);
      runSquence(['site:reload-pages']);
    });
    callback();
  },
};
