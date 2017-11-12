const browserSync = require('browser-sync').create('site-server');

module.exports = {
  deps: ['site:build'],
  fn: (gulp, callback) => {
    browserSync.init({
      files: [`${global.MAIN_BUILD_SITE_DIR}/**`],
      // port: 4000,
      server: {
        baseDir: global.MAIN_BUILD_SITE_DIR
      },
      logConnections: true
    });
    callback();
  }
};
