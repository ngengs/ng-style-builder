const gutil = require('gulp-util');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

module.exports = () => {
  return imagemin(['images/*.{jpg,png,svg}'], `${global.MAIN_BUILD_OUTPUT_DIR}/images`, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({quality: '60-80'}),
      imageminSvgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]
  }).then(files => {
    gutil.log(files);
  });
};
