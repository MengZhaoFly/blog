const importReplace = require('./index.js');

const plugins = [
  [importReplace, {
    "customSourceFunc": componentName => `lib/${componentName}/${componentName}`
  }]
];

module.exports = { plugins };
