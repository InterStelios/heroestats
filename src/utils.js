const finder = require('find-package-json');
const getProjectPath = () =>
  finder(__dirname)
    .next()
    .filename.split('package.json')[0];
const withProjectPath = fileName => `${getProjectPath()}${fileName}`;

module.exports = {
  getProjectPath,
  withProjectPath,
};
