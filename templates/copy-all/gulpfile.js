const gulp = require('gulp');
const fs = require('fs');
const pkg = require('./package.json');

const today = new Date();

// Global Variable
global.MAIN_BANNER_COMMENT = '/*!\n' +
  ` * ${pkg.title} v${pkg.version} (${pkg.homepage})\n` +
  ` * Copyright ${today.getFullYear()} ${pkg.author}\n` +
  ' * based on\n' +
  ` * Bootstrap v${pkg.bootstrap.version} (${pkg.bootstrap.homepage})\n` +
  ` * Copyright 2011-${today.getFullYear()} The Bootstrap Authors (${pkg.bootstrap.contributor})\n` +
  ` * Licensed under the ${pkg.bootstrap.license} license\n` +
  ' */\n';
global.MAIN_BUILD_OUTPUT_DIR = './dist';
global.MAIN_BUILD_SITE_DIR = './_site';
global.MAIN_CONFIG_BRIDGE = require('./utils/configBridge.json');

global.MAIN_PACKAGE_NAME = pkg.name;

global.MAIN_OUTPUT_FILE_NAME = (name, type) => `${pkg.name}-${name}.${type}`;

global.MAIN_CONFIGURATION_FILE = (type) => {
  let fileName;
  switch (type) {
    case 1:
      fileName = 'styles';
      break;
    case 2:
      fileName = 'scripts';
      break;
    default:
      throw new Error('Type not supported');
  }
  return JSON.parse(fs.readFileSync(`./configs/${fileName}.json`));
};

// Use gulp-stats
require('gulp-stats')(gulp);
// Get all task from ./gulp-tasks
require('gulp-require-tasks')({
  gulp,
});

