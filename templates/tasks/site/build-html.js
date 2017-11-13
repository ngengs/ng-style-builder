const htmlmin = require('gulp-htmlmin');

module.exports = {
  deps: ['site:assets'],
  fn: gulp => gulp.src('./views/*.html')
    .pipe(gulp.dest(global.MAIN_BUILD_SITE_DIR))
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
    }))
    .pipe(gulp.dest(global.MAIN_BUILD_SITE_DIR)),
};
