module.exports = {
  fn: gulp => gulp.src([`${global.MAIN_BUILD_OUTPUT_DIR}/**/*`]).pipe(gulp.dest(`${global.MAIN_BUILD_SITE_DIR}/assets/`)),
};
