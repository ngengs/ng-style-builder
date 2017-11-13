#!/usr/bin/env node

const program = require('commander');
const prompt = require('inquirer');
const sortedObject = require('sorted-object');
const pkg = require('../package.json');
const logger = require('../lib/logger');
const dirs = require('../lib/dirs');
const { write } = require('../lib/files');
const templates = require('../lib/templates');
const utils = require('../lib/utils');
const interactiveShell = require('../lib/interactive-shell');

const exitProcess = process.exit;
process.exit = exitProcess;

const pkgOutputReserve = {
  description: `Style builder generated using ${pkg.name}`,
  keywords: pkg.keywords,
  script: {
    start: 'gulp',
  },
  engine: {
    node: '>=8.0.0',
  },
  bootstrap: {
    version: '3.3.7',
    license: 'MIT',
    homepage: 'http://getbootstrap.com',
    contributor: 'https://github.com/twbs/bootstrap/graphs/contributors',
  },
};


const main = async (data) => {
  logger.log('Preparing data...');
  const {
    title, packageName, version, style, ejs, testCss, testJs, git, install,
  } = data;
  const dependencies = {};

  logger.log('Preparing project dir...');
  // noinspection JSUnresolvedVariable
  const destination = packageName;
  const emptyDir = await dirs.empty(destination);
  if (!emptyDir) {
    // noinspection JSUnresolvedVariable
    const canContinue = await prompt.prompt({
      type: 'confirm',
      name: 'value',
      message: `Directory with name '${packageName}' already exist and not empty, continue?`,
      default: true,
    });
    if (!canContinue.value) {
      logger.error('Aborting');
    }
  }
  await dirs.mkdir(destination);

  logger.log('Create base needed file...');
  await templates.copy('copy-all/.babelrc', `${destination}/.babelrc`);
  await templates.copy('copy-all/.editorconfig', `${destination}/.editorconfig`);
  await templates.copy('copy-all/.jscsrc', `${destination}/.jscsrc`);
  await templates.copy('copy-all/.jshintrc', `${destination}/.jshintrc`);
  await templates.copy('copy-all/gulpfile.js', `${destination}/gulpfile.js`);

  logger.log('Create base needed dir...');
  await dirs.mkdir(`${destination}/configs`);
  await dirs.mkdir(`${destination}/fonts`);
  await dirs.mkdir(`${destination}/images`);
  await dirs.mkdir(`${destination}/libraries`);
  await dirs.mkdir(`${destination}/utils`);

  logger.log('Create empty file to keep base needed dir...');
  await templates.copy('copy-all/.gitkeep', `${destination}/fonts/.gitkeep`);
  await templates.copy('copy-all/.gitkeep', `${destination}/images/.gitkeep`);
  await templates.copy('copy-all/.gitkeep', `${destination}/libraries/.gitkeep`);
  await templates.copy('copy-all/utils/configBridge.json', `${destination}/utils/configBridge.json`);

  logger.log('Preparing building task directory...');
  await dirs.mkdir(`${destination}/gulp-tasks`);
  await dirs.mkdir(`${destination}/gulp-tasks/banner`);
  await dirs.mkdir(`${destination}/gulp-tasks/clean`);
  await dirs.mkdir(`${destination}/gulp-tasks/css`);
  await dirs.mkdir(`${destination}/gulp-tasks/default`);
  await dirs.mkdir(`${destination}/gulp-tasks/default`);
  await dirs.mkdir(`${destination}/gulp-tasks/dist`);
  await dirs.mkdir(`${destination}/gulp-tasks/fonts`);
  await dirs.mkdir(`${destination}/gulp-tasks/images`);
  await dirs.mkdir(`${destination}/gulp-tasks/js`);
  await dirs.mkdir(`${destination}/gulp-tasks/site`);
  await dirs.mkdir(`${destination}/gulp-tasks/watch`);
  // noinspection JSUnresolvedVariable
  if (testCss || testJs) {
    await dirs.mkdir(`${destination}/gulp-tasks/test`);
  }

  logger.log('Preparing building task base file...');
  await templates.copy('tasks/banner/index.js', `${destination}/gulp-tasks/banner/index.js`);
  await templates.copy('tasks/clean/index.js', `${destination}/gulp-tasks/clean/index.js`);
  await templates.copy('tasks/css/index.js', `${destination}/gulp-tasks/css/index.js`);
  await templates.copy('tasks/css/min.js', `${destination}/gulp-tasks/css/min.js`);
  await templates.copy('tasks/default/index.js', `${destination}/gulp-tasks/default/index.js`);
  await templates.copy('tasks/dist/index.js', `${destination}/gulp-tasks/dist/index.js`);
  await templates.copy('tasks/fonts/index.js', `${destination}/gulp-tasks/fonts/index.js`);
  await templates.copy('tasks/images/index.js', `${destination}/gulp-tasks/images/index.js`);
  await templates.copy('tasks/js/index.js', `${destination}/gulp-tasks/js/index.js`);
  await templates.copy('tasks/js/app.js', `${destination}/gulp-tasks/js/app.js`);
  await templates.copy('tasks/js/core.js', `${destination}/gulp-tasks/js/core.js`);
  await templates.copy('tasks/js/lib.js', `${destination}/gulp-tasks/js/lib.js`);
  await templates.copy('tasks/js/modernizr.js', `${destination}/gulp-tasks/js/modernizr.js`);
  await templates.copy('tasks/site/index.js', `${destination}/gulp-tasks/site/index.js`);
  await templates.copy('tasks/site/assets.js', `${destination}/gulp-tasks/site/assets.js`);
  await templates.copy('tasks/site/reload-assets.js', `${destination}/gulp-tasks/site/reload-assets.js`);
  await templates.copy('tasks/site/reload-pages.js', `${destination}/gulp-tasks/site/reload-pages.js`);
  await templates.copy('tasks/site/serve.js', `${destination}/gulp-tasks/site/serve.js`);
  await templates.copy('tasks/watch/index.js', `${destination}/gulp-tasks/watch/index.js`);
  await templates.copy('tasks/watch/dist.js', `${destination}/gulp-tasks/watch/dist.js`);
  await templates.copy('tasks/watch/site.js', `${destination}/gulp-tasks/watch/site.js`);

  logger.log('Prepare default dependencies...');
  /* eslint-disable dot-notation */
  dependencies['del'] = '^3.0.0';
  dependencies['gulp'] = '^3.9.1';
  dependencies['gulp-require-tasks'] = '^1.2.1';
  dependencies['gulp-flatten'] = '^0.3.1';
  dependencies['gulp-header'] = '^1.8.9';
  dependencies['gulp-include'] = '^2.3.1';
  dependencies['gulp-rename'] = '^1.2.2';
  dependencies['gulp-stats'] = '0.0.4';
  dependencies['gulp-util'] = '^3.0.8';
  dependencies['merge-stream'] = '^1.0.1';
  dependencies['run-sequence'] = '^2.1.0';
  dependencies['pump'] = '^1.0.2';
  /* eslint-enable dot-notation */

  logger.log('Preparing image builder dependencies...');
  /* eslint-disable dot-notation */
  dependencies['imagemin'] = '^5.3.1';
  dependencies['imagemin-jpegtran'] = '^5.0.2';
  dependencies['imagemin-pngquant'] = '^5.0.0';
  dependencies['imagemin-svgo'] = '^6.0.0';
  /* eslint-enable dot-notation */

  logger.log('Preparing javascript builder...');
  /* eslint-disable dot-notation: "off" */
  dependencies['babel-core'] = '^6.25.0';
  dependencies['babel-preset-es2015'] = '^6.24.1';
  dependencies['babel-core'] = '^6.25.0';
  dependencies['babel-preset-es2015'] = '^6.24.1';
  dependencies['gulp-concat'] = '^2.6.1';
  dependencies['gulp-babel'] = '^7.0.0';
  dependencies['gulp-uglify'] = '^3.0.0';
  dependencies['gulp-modernizr'] = '^1.0.0-alpha';
  /* eslint-enable dot-notation */
  const resultCopyJs = await templates.copyRecursive('js', destination);
  if (!resultCopyJs) {
    logger.log('Failed copying javascript');
  } else {
    logger.log('Finish copying javascript');
  }

  logger.log(`Preparing style builder with "${style}"...`);
  /* eslint-disable dot-notation */
  dependencies['gulp-sourcemaps'] = '^2.6.0';
  dependencies['gulp-clean-css'] = '^3.7.0';
  dependencies['gulp-autoprefixer'] = '^4.0.0';
  dependencies['gulp-csscomb'] = '^3.0.8';
  dependencies['csscomb'] = '^4.2.0';
  /* eslint-enable dot-notation */
  if (style === 'less') {
    dependencies['gulp-less'] = '^3.3.2';
    await templates.copy('tasks/css/build-less.js', `${destination}/gulp-tasks/css/build.js`);
    const result = await templates.copyRecursive('less', destination);
    if (!result) {
      logger.log('Failed copying less directory');
    } else {
      logger.log('Finish copying less component');
    }
  }

  logger.log('Preparing site / html view template...');
  await dirs.mkdir(`${destination}/views`);
  /* eslint-disable dot-notation */
  dependencies['browser-sync'] = '^2.18.13';
  dependencies['gulp-htmlmin'] = '^3.0.0';
  /* eslint-enable dot-notation */
  // noinspection JSUnresolvedVariable
  if (ejs) {
    /* eslint-disable dot-notation */
    dependencies['gulp-ejs'] = '^3.1.0';
    dependencies['gulp-data'] = '^1.2.1';
    /* eslint-enable dot-notation */
    await templates.copy('tasks/site/build-ejs.js', `${destination}/gulp-tasks/site/build.js`);
    await dirs.mkdir(`${destination}/data`);
    await dirs.mkdir(`${destination}/views/includes`);
    await templates.copy('ejs/data/head.json', `${destination}/data/head.json`);
    await templates.copy('ejs/data/footer.json', `${destination}/data/footer.json`);
    await templates.copy('ejs/views/index.ejs', `${destination}/views/index.ejs`);
    await templates.copy('ejs/views/includes/head.ejs', `${destination}/views/includes/head.ejs`);
    await templates.copy('ejs/views/includes/footer.ejs', `${destination}/views/includes/footer.ejs`);
  } else {
    await templates.copy('html/index.html', `${destination}/views/index.html`);
    await templates.copy('tasks/site/build-html.js', `${destination}/gulp-tasks/site/build.js`);
  }

  let testType = 0;
  // noinspection JSUnresolvedVariable
  if (testCss) {
    testType += 1;
    logger.log('Preparing css test...');
    /* eslint-disable dot-notation */
    dependencies['gulp-csslint'] = '^1.0.0';
    /* eslint-enable dot-notation */
    await templates.copy('tasks/test/css.js', `${destination}/gulp-tasks/test/css.js`);
    await templates.copy('tasks/test/csslint.js', `${destination}/gulp-tasks/test/csslint.js`);
  }

  // noinspection JSUnresolvedVariable
  if (testJs) {
    testType += 2;
    /* eslint-disable dot-notation */
    dependencies['gulp-jshint'] = '^2.0.4';
    dependencies['gulp-qunit'] = '^1.5.0';
    dependencies['jshint'] = '^2.9.5';
    dependencies['qunitjs'] = '^2.4.0';
    /* eslint-enable dot-notation */
    await templates.copy('tasks/test/js.js', `${destination}/gulp-tasks/test/js.js`);
    await templates.copy('tasks/test/jscs.js', `${destination}/gulp-tasks/test/jscs.js`);
    await templates.copy('tasks/test/jshint.js', `${destination}/gulp-tasks/test/jshint.js`);
    await templates.copy('tasks/test/qunit.js', `${destination}/gulp-tasks/test/qunit.js`);
  }

  switch (testType) {
    case 1:
      await templates.copy('tasks/test/index-css.js', `${destination}/gulp-tasks/test/index.js`);
      logger.log('Preparing configs for css with test...');
      await templates.copy('configs/styles.json', `${destination}/configs/styles.json`);
      logger.log('Preparing configs for js without test...');
      await templates.copy('configs/scripts-no-test.json', `${destination}/configs/scripts.json`);
      break;
    case 2:
      await templates.copy('tasks/test/index-js.js', `${destination}/gulp-tasks/test/index.js`);
      logger.log('Preparing configs for css without test...');
      await templates.copy('configs/styles-no-test.json', `${destination}/configs/styles.json`);
      logger.log('Preparing configs for js without test...');
      await templates.copy('configs/scripts.json', `${destination}/configs/scripts.json`);
      break;
    case 3:
      await templates.copy('tasks/test/index-all.js', `${destination}/gulp-tasks/test/index.js`);
      logger.log('Preparing configs for css and js with test...');
      await templates.copy('configs/styles.json', `${destination}/configs/styles.json`);
      await templates.copy('configs/scripts.json', `${destination}/configs/scripts.json`);
      break;
    case 0:
    default:
      logger.log('Preparing configs for css and js with test...');
      await templates.copy('configs/styles-no-test.json', `${destination}/configs/styles.json`);
      await templates.copy('configs/scripts-no-test.json', `${destination}/configs/scripts.json`);
      break;
  }

  if (git) {
    logger.log('Preparing git...');
    await templates.copy('git/.gitattributes', `${destination}/.gitattributes`);
    await templates.copy('git/gitignore', `${destination}/.gitignore`);
    logger.log('Initializing git repo...');
    await utils.exec(`cd ${destination} && git init`);
  }


  logger.log('Preparing package.json...');
  const pkgOut = {};
  pkgOut.name = packageName;
  pkgOut.title = title;
  pkgOut.version = version;
  pkgOut.author = pkg.author;
  pkgOut.homepage = pkg.homepage;
  Object.assign(pkgOut, pkgOutputReserve);
  pkgOut.dependencies = sortedObject(dependencies);

  logger.log('Create package.json file...');
  write(`${destination}/package.json`, `${JSON.stringify(pkgOut, null, 2)}\n`);
  logger.log();

  if (install) {
    logger.log('Install dependency...');
    await utils.exec(`cd ${destination} && npm install`);
    logger.log();
  }

  return true;
};

program
  .version(pkg.version)
  .description(`${pkg.description}.\n\r  You can use without option to run interactive shell.`);

program
  .option('-t --title <title>', 'Project title')
  .option('-p --package-name <package>', 'Project package name. If you not use this option but passing title option it ' +
    'will auto generate from title.')
  .option('-n --version-number <version-number>', 'Version number')
  .option('-d --version-default', 'Version number Default 1.0.0')
  .option('-s --style <style>', 'Css preprocessor style type (less|sass)', /^(less|sass)$/i, false)
  .option('-e --ejs', 'Use EJS for templating view')
  .option('   --ejs-no', 'Don\'t use EJS for templating view, just use plain html')
  .option('-j --test-js', 'Use Javascript test')
  .option('   --test-js-no', 'Don\'t use Javascript test')
  .option('-c --test-css', 'Use CSS test')
  .option('   --test-css-no', 'Don\'t use CSS test')
  .option('-g --git', 'Use Git')
  .option('   --git-no', 'Don\'t use Git')
  .option('-i --install', 'Automatically install all node dependencies');

program.parse(process.argv);
// noinspection JSUnresolvedVariable
if (program.title) {
  // noinspection JSUnresolvedVariable
  const check = utils.validateEmpty(program.title);
  if (typeof check === 'string' || check instanceof String) {
    logger.error('Cant use empty title');
  }
}
if (program.packageName) {
  const checkEmpty = utils.validateEmpty(program.packageName);
  if (typeof checkEmpty === 'string' || checkEmpty instanceof String) {
    logger.error('Cant use empty package name');
  }
  const checkFormat = utils.validatePackageName(program.packageName);
  if (typeof checkFormat === 'string' || checkFormat instanceof String) {
    logger.error(checkFormat);
  }
} else {
  /* eslint-disable no-lonely-if */
  // noinspection JSUnresolvedVariable
  if (program.title) {
    // noinspection JSUnresolvedVariable
    program.packageName = utils.createPackageFromString(program.title);
  }
  /* eslint-enable no-lonely-if */
}
// noinspection JSUnresolvedVariable
if (program.versionNumber) {
  // noinspection JSUnresolvedVariable
  const check = utils.validateEmpty(program.versionNumber);
  if (typeof check === 'string' || check instanceof String) {
    logger.error('Cant use empty version number');
  }
  // noinspection JSUnresolvedVariable
  program.versionNumber = utils.cleanVersion(program.versionNumber);
  // noinspection JSUnresolvedVariable
  const checkFormat = utils.validateVersion(program.versionNumber);
  if (typeof checkFormat === 'string' || checkFormat instanceof String) {
    logger.error(checkFormat);
  }
}

interactiveShell(program, main);
