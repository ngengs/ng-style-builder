const prompt = require('inquirer');
const logger = require('./logger');
const utils = require('./utils');

const questionTitle = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter Project Title ..',
    validate: (answer) => utils.validateEmpty(answer)
  },
  {
    type: 'input',
    name: 'package',
    message: 'Enter Project Package Name ..',
    default: (answer) => utils.createPackageFromString(answer.title),
    validate: (answer) => {
      let resultEmpty = utils.validateEmpty(answer);
      if (typeof resultEmpty === 'string' || resultEmpty instanceof String) {
        return resultEmpty;
      }
      let resultPackageName = utils.validatePackageName(answer);
      if(typeof resultPackageName === 'string' || resultPackageName instanceof String) {
        return resultPackageName;
      }

      return true;
    }
  }
];
// noinspection JSUnusedGlobalSymbols
const questionVersion = [{
  type: 'input',
  name: 'version',
  message: 'Enter version number ..',
  validate: (answer) => {
    let resultEmpty = utils.validateEmpty(answer);
    if (typeof resultEmpty === 'string' || resultEmpty instanceof String) {
      return resultEmpty;
    }
    let resultVersion = utils.validateVersion(answer);
    if(typeof resultVersion === 'string' || resultVersion instanceof String) {
      return resultVersion;
    }

    return true;
  },
  filter: (answer) => utils.cleanVersion(answer),
  default: '1.0.0'
}];
const questionStyle = [{
  type: 'list',
  name: 'style',
  message: 'Select style preprocessor type ..',
  choices: [
    'less',
    {
      name: 'sass',
      disabled: 'Unavailable at this time'
    }
  ]
}];
const questionEjs = [{
  type: 'confirm',
  name: 'ejs',
  message: 'Use ejs support?',
  default: true
}];
const questionTestCss = [{
  type: 'confirm',
  name: 'test_css',
  message: 'Include css test style?',
  default: true
}];
const questionTestJs = [{
  type: 'confirm',
  name: 'test_js',
  message: 'Include javascript test unit?',
  default: true
}];
const questionGit = [{
  type: 'confirm',
  name: 'git',
  message: 'Use git?',
  default: true
}];

module.exports = async (program, main) => {
  // const answer = await prompt.prompt(question);
  let title = null;
  let packageName = null;
  let version = null;
  let style = null;
  let ejs = null;
  let testCss = null;
  let testJs = null;
  let git = null;
  // noinspection JSUnresolvedVariable
  if (program.title && program.packageName) {
    // noinspection JSUnresolvedVariable
    title = program.title;
    packageName = program.packageName;
  } else {
    const answer = await prompt.prompt(questionTitle);
    title = answer.title;
    packageName = answer.package;
  }
  // noinspection JSUnresolvedVariable
  if (program.versionNumber) {
    // noinspection JSUnresolvedVariable
    version = program.versionNumber;
  } else {
    // noinspection JSUnresolvedVariable
    if (program.versionDefault) {
      version = '1.0.0';
    } else {
      const answer = await prompt.prompt(questionVersion);
      version = answer.version;
    }
  }
  // noinspection JSUnresolvedVariable
  if (!program.style) {
    const answer = await prompt.prompt(questionStyle);
    style = answer.style;
  } else {
    // noinspection JSUnresolvedVariable
    style = program.style;
  }

  // noinspection JSUnresolvedVariable
  if (program.ejsNo) {
    ejs = false;
  } else {
    // noinspection JSUnresolvedVariable
    if (!program.ejs) {
      const answer = await prompt.prompt(questionEjs);
      ejs = answer.ejs;
    } else {
      // noinspection JSUnresolvedVariable
      ejs = program.ejs;
    }
  }
  // noinspection JSUnresolvedVariable
  if (program.testCssNo) {
    testCss = false;
  } else {
    // noinspection JSUnresolvedVariable
    if (!program.testCss) {
      const answer = await prompt.prompt(questionTestCss);
      // noinspection JSUnresolvedVariable
      testCss = answer.test_css;
    } else {
      // noinspection JSUnresolvedVariable
      testCss = program.testCss;
    }
  }
  // noinspection JSUnresolvedVariable
  if (program.testJsNo) {
    testJs = false;
  } else {
    // noinspection JSUnresolvedVariable
    if (!program.testJs) {
      const answer = await prompt.prompt(questionTestJs);
      // noinspection JSUnresolvedVariable
      testJs = answer.test_js;
    } else {
      // noinspection JSUnresolvedVariable
      testJs = program.testJs;
    }
  }
  // noinspection JSUnresolvedVariable
  if (program.gitNo) {
    git = false;
  } else {
    // noinspection JSUnresolvedVariable
    if (!program.git) {
      const answer = await prompt.prompt(questionGit);
      git = answer.git;
    } else {
      // noinspection JSUnresolvedVariable
      git = program.git;
    }
  }
  if (style === 'sass') {
    logger.log('Sorry sass not supported yet...','Use less for now');
  }
  const data = {
    title: title,
    package: packageName,
    version: version,
    style: style,
    ejs: ejs,
    testCss: testCss,
    testJs: testJs,
    git: git,
    install: program.install
  };
  let result = await main(data);
  if (result) {
    logger.log('Finish running with config:');
    logger.logAlt(data);
    logger.success();
    logger.separator();
    logger.success('Completed');
    logger.success('Sources  ',':', data.package);
    logger.separator();
  }
};