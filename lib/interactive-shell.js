const prompt = require('inquirer');
const logger = require('./logger');
const utils = require('./utils');

const questionTitle = [
  {
    type: 'input',
    name: 'answerTitle',
    message: 'Enter Project Title ..',
    validate: answer => utils.validateEmpty(answer),
  },
  {
    type: 'input',
    name: 'answerPackageName',
    message: 'Enter Project Package Name ..',
    default: answer => utils.createPackageFromString(answer.title),
    validate: (answer) => {
      const resultEmpty = utils.validateEmpty(answer);
      if (typeof resultEmpty === 'string' || resultEmpty instanceof String) {
        return resultEmpty;
      }
      const resultPackageName = utils.validatePackageName(answer);
      if (typeof resultPackageName === 'string' || resultPackageName instanceof String) {
        return resultPackageName;
      }

      return true;
    },
  },
];
// noinspection JSUnusedGlobalSymbols
const questionVersion = [{
  type: 'input',
  name: 'answerVersion',
  message: 'Enter version number ..',
  validate: (answer) => {
    const resultEmpty = utils.validateEmpty(answer);
    if (typeof resultEmpty === 'string' || resultEmpty instanceof String) {
      return `${resultEmpty} or you must check your semantic versioning`;
    }
    const resultVersion = utils.validateVersion(answer);
    if (typeof resultVersion === 'string' || resultVersion instanceof String) {
      return resultVersion;
    }

    return true;
  },
  filter: answer => utils.cleanVersion(answer),
  default: '1.0.0',
}];
const questionStyle = [{
  type: 'list',
  name: 'answerStyle',
  message: 'Select style preprocessor type ..',
  choices: [
    'less',
    {
      name: 'sass',
      disabled: 'Unavailable at this time',
    },
  ],
}];
const questionEjs = [{
  type: 'confirm',
  name: 'answerEjs',
  message: 'Use ejs support?',
  default: true,
}];
const questionTestCss = [{
  type: 'confirm',
  name: 'answerTestCss',
  message: 'Include css test style?',
  default: true,
}];
const questionTestJs = [{
  type: 'confirm',
  name: 'test_js',
  message: 'Include javascript test unit?',
  default: true,
}];
const questionGit = [{
  type: 'confirm',
  name: 'answerGit',
  message: 'Use git?',
  default: true,
}];

module.exports = async (program, main) => {
  // const answer = await prompt.prompt(question);
  let {
    title, packageName, version, style,
  } = program;
  let ejs = true;
  let testCss = true;
  let testJs = true;
  let git = true;
  let install = true;
  // noinspection JSUnresolvedVariable
  if (!program.title && !program.packageName) {
    const answer = await prompt.prompt(questionTitle);
    const { answerTitle, answerPackageName } = answer;
    title = answerTitle;
    packageName = answerPackageName;
  }
  // noinspection JSUnresolvedVariable
  if (!program.versionNumber) {
    // noinspection JSUnresolvedVariable
    if (program.versionDefault) {
      version = '1.0.0';
    } else {
      const answer = await prompt.prompt(questionVersion);
      const { answerVersion } = answer;
      version = answerVersion;
    }
  }
  // noinspection JSUnresolvedVariable
  if (!program.style) {
    const answer = await prompt.prompt(questionStyle);
    const { answerStyle } = answer;
    style = answerStyle;
  }

  // noinspection JSUnresolvedVariable
  if (program.ejsNo) {
    ejs = false;
  } else if (!program.ejs) {
    const answer = await prompt.prompt(questionEjs);
    const { answerEjs } = answer;
    ejs = answerEjs;
  }

  // noinspection JSUnresolvedVariable
  if (program.testCssNo) {
    testCss = false;
  } else if (!program.testCss) {
    const answer = await prompt.prompt(questionTestCss);
    const { answerTestCss } = answer;
    testCss = answerTestCss;
  }
  // noinspection JSUnresolvedVariable
  if (program.testJsNo) {
    testJs = false;
  } else if (!program.testJs) {
    const answer = await prompt.prompt(questionTestJs);
    const { answerTestJs } = answer;
    testJs = answerTestJs;
  }
  // noinspection JSUnresolvedVariable
  if (program.gitNo) {
    git = false;
  } else if (!program.git) {
    const answer = await prompt.prompt(questionGit);
    const { answerGit } = answer;
    git = answerGit;
  }

  if (!program.install) {
    install = false;
  }

  if (style === 'sass') {
    logger.log('Sorry sass not supported yet...', 'Use less for now');
  }
  const data = {
    title,
    packageName,
    version,
    style,
    ejs,
    testCss,
    testJs,
    git,
    install,
  };
  const result = await main(data);
  if (result) {
    logger.log('Finish running with config:');
    logger.logAlt(data);
    logger.success();
    logger.separator();
    logger.success('Completed');
    logger.success('Sources  ', ':', packageName);
    logger.separator();
  }
};
