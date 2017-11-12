const del = require('del');

module.exports = {
  fn: () => del([global.MAIN_BUILD_OUTPUT_DIR, global.MAIN_BUILD_SITE_DIR])
};
