module.exports = {
  fn: gulp => gulp.src(['libraries/**/*']).pipe(gulp.dest(`${global.MAIN_BUILD_OUTPUT_DIR}/libraries/`)),
};
