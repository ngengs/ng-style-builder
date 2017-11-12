const fs = require('fs');
const path = require('path');
const ejs = require('gulp-ejs');
const data = require('gulp-data');
const htmlmin = require('gulp-htmlmin');
const gutil = require('gulp-util');

module.exports = {
  deps: ['site:assets'],
  fn: (gulp) => {
    return gulp.src('./views/*.ejs')
      .pipe(
        data((file) => {
          let head = JSON.parse(fs.readFileSync('./data/head.json'));
          let footer = JSON.parse(fs.readFileSync('./data/footer.json'));
          let pageData = null;
          let pageDataLocation = `./data/${path.basename(file.path)}.json`;
          if (fs.existsSync(pageDataLocation)) {
            pageData = JSON.parse(fs.readFileSync(pageDataLocation));
          } else {
            gutil.log(`Tidak terdapat data untuk ${path.basename(file.path)}`);
          }
          return {
            'head': head,
            'footer': footer,
            'data': pageData
          }
        })
      )
      .pipe(
        ejs(null, null, {ext: '.html'})
          .on('error', gutil.log)
      )
      .pipe(htmlmin({
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }))
      .pipe(gulp.dest(global.MAIN_BUILD_SITE_DIR));
  }
};
