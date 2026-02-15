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

const getReplaysListDateInfo = (listsPath) => {
  const replaysListPath = path.join(listsPath, 'replaysList.json');

  try {
    const replaysListRaw = fs.readFileSync(replaysListPath, 'utf8');
    const replaysList = JSON.parse(replaysListRaw);

    return {
      preparedAtDate: getValidDate(replaysList.replaysListPreparedAt),
      useReplaysListMtimeFallback: true,
    };
  } catch {
    return {
      preparedAtDate: null,
      useReplaysListMtimeFallback: false,
    };
  }
};

const getParsingStatusUpdateDate = (listsPath, resultsPath) => {
  const replaysListPath = path.join(listsPath, 'replaysList.json');
  const statsZipPath = path.join(resultsPath, 'stats.zip');

  const { preparedAtDate, useReplaysListMtimeFallback } =
    getReplaysListDateInfo(listsPath);

  if (preparedAtDate) {
    return preparedAtDate;
  }

  if (useReplaysListMtimeFallback) {
    const replaysListModifiedAt = getFileModifiedAt(replaysListPath);

    if (replaysListModifiedAt) {
      return replaysListModifiedAt;
    }
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
