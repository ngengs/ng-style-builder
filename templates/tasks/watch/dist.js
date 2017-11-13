const runSquence = require('run-sequence');
const gutil = require('gulp-util');

module.exports = {
  deps: ['dist'],
  fn: (gulp, callback) => {
    const logger = (event) => {
      gutil.log('Watched file', `'${gutil.colors.cyan(event.path)}'`, `(${gutil.colors.magenta(event.type)})`);
    };
    gulp.watch('configs/styles.json', (event) => {
      logger(event);
      runSquence(['css']);
    });
    gulp.watch('configs/scripts.json', (event) => {
      logger(event);
      runSquence(['js:core', 'js:app']);
    });
    gulp.watch('less/**/*.less', (event) => {
      logger(event);
      runSquence(['css']);
    });
    gulp.watch('js/app/*.js', (event) => {
      logger(event);
      runSquence(['js:app']);
    });
    gulp.watch('libraries/**/*', (event) => {
      logger(event);
      runSquence(['js:lib']);
    });
    gulp.watch('js/bootstrap/*.js', (event) => {
      logger(event);
      runSquence(['js:core']);
    });
    gulp.watch('app/images/**/*', (event) => {
      logger(event);
      runSquence(['images']);
    });
    gulp.watch('app/fonts/**/*', (event) => {
      logger(event);
      runSquence(['fonts']);
    });
    callback();
  },
};
