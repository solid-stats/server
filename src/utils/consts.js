const os = require('os');
const path = require('path');

const rootFolderName = path.join(os.homedir(), 'sg_stats');
const allTimeFolderName = 'all_time';

const listsPath = path.join(rootFolderName, 'lists');
const resultsPath = path.join(rootFolderName, 'results');

module.exports = {
  rootFolderName,
  allTimeFolderName,
  listsPath,
  resultsPath,
};
