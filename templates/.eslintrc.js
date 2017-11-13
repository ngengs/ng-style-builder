module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "rules": {
    // Override our default settings just for this directory
    // This only template, so node.js import is not required
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off"
  }
};