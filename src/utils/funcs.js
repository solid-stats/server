const { resultsPath } = require('./consts');
const path = require('path');
const fs = require('fs-extra');

function getRotationFolderName(index) {
  return `rotation_${index}`;
}

function isGameTypeWithRotations(gameType) {
  return fs.pathExistsSync(path.join(resultsPath, gameType, 'all_time'));
}

module.exports = {
  getRotationFolderName,
  isGameTypeWithRotations,
};
