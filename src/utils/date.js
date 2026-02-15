const fs = require('fs-extra');
const path = require('path');

const getValidDate = (value) => {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};

const getFileModifiedAt = (filePath) => {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return null;
  }
};

const getCommittedUpdateTime = (resultsPath) => {
  const parsingStatusPath = path.join(resultsPath, 'parsing_status.json');

  try {
    const parsingStatusRaw = fs.readFileSync(parsingStatusPath, 'utf8');
    const parsingStatus = JSON.parse(parsingStatusRaw);

    return getValidDate(parsingStatus.updateTime);
  } catch {
    return null;
  }
};

const getParsingStatusUpdateDate = (_listsPath, resultsPath) => {
  const statsZipPath = path.join(resultsPath, 'stats.zip');

  const committedUpdateTime = getCommittedUpdateTime(resultsPath);

  if (committedUpdateTime) {
    return committedUpdateTime;
  }

  const statsZipModifiedAt = getFileModifiedAt(statsZipPath);

  if (statsZipModifiedAt) {
    return statsZipModifiedAt;
  }

  return new Date();
};

module.exports = {
  getParsingStatusUpdateDate,
};
