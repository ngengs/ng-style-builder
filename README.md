# NG Style Builder

[![Build Status](https://travis-ci.org/ngengs/ng-style-builder.svg?branch=development)](https://travis-ci.org/ngengs/ng-style-builder) [![npm](https://img.shields.io/npm/v/ng-style-builder.svg)](https://www.npmjs.com/package/ng-style-builder) [![David](https://img.shields.io/david/ngengs/ng-style-builder.svg)](https://www.npmjs.com/package/ng-style-builder) [![David](https://img.shields.io/david/dev/ngengs/ng-style-builder.svg)](https://www.npmjs.com/package/ng-style-builder) [![license](https://img.shields.io/npm/l/ng-style-builder.svg)](https://www.npmjs.com/package/ng-style-builder) [![Greenkeeper badge](https://badges.greenkeeper.io/ngengs/ng-style-builder.svg)](https://greenkeeper.io/)

This is style boilerplate builder that I use when get project to create style some website.
Generated style is based on [Bootstrap v3](http://getbootstrap.com)

## Usage
```
  Usage: ngstyler [options]

  Options:

    -V, --version                         output the version number
    -t --title <title>                    Project title
    -p --package-name <package>           Project package name. If you not use this option but passing title option it will auto generate from title.
    -n --version-number <version-number>  Version number
    -d --version-default                  Version number Default 1.0.0
    -s --style <style>                    Css preprocessor style type (less|sass)
    -e --ejs                              Use EJS for templating view
       --ejs-no                           Don't use EJS for templating view, just use plain html
    -j --test-js                          Use Javascript test
       --test-js-no                       Don't use Javascript test
    -c --test-css                         Use CSS test
       --test-css-no                      Don't use CSS test
    -g --git                              Use Git
       --git-no                           Don't use Git
    -i --install                          Automatically install all node dependencies
    -h, --help                            output usage information
```

If you not pass the options, or needed options not complete it will trigger interative shell to complete the needed value.

Minimal use is
```
ngstyler -dejcgi -t "Project Name" -s less
```

**Note**
For now it only have less style support, but it will support sass soon.


### Requirement
Builder
- Node.js LTS [Download](https://nodejs.org/en/download/)

Generated
- Node.js LTS [Download](https://nodejs.org/en/download/)
- [Gulp](https://gulpjs.com/)

### Installation
```
npm install -g ng-style-builder
```

### Running Generated Styles Boilerplate
Generated boilerplate can compile using [gulp](https://gulpjs.com/)
```
gulp dist
```
With `dist` task it will generated all file to `package-name/dist` directory
If you want know all task available just run
```
gulp --tasks
```

### License
[MIT](LICENSE)

