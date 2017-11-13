const gutil = require('gulp-util');

module.exports = {
  nativeTask: () => {
    gutil.log(global.MAIN_BANNER_COMMENT);
  },
};
