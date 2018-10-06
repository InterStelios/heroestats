require('dotenv').config();
require('pretty-error').start();

const fs = require('fs');
const { withProjectPath } = require('./src/utils');

if (!fs.existsSync(withProjectPath('stats.json'))) {
  throw new Error(
    'stats.json does not exists. Consider running "yarn hydrate".',
  );
} else {
  const stats = require('./stats.json');
  // TODO Add express server to serve the data.
}
