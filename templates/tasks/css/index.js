const runSquence = require('run-sequence');

module.exports = {
  fn: (gulp, callback) => {
    runSquence(['css:build'], ['css:min'], callback);
  }
};
