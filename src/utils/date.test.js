const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const test = require('node:test');
const assert = require('node:assert/strict');

const { getParsingStatusUpdateDate } = require('./date');

const createTempPaths = () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'sg-stats-server-date-'));
  const listsPath = path.join(tempRoot, 'lists');
  const resultsPath = path.join(tempRoot, 'results');

  fs.ensureDirSync(listsPath);
  fs.ensureDirSync(resultsPath);

  return {
    tempRoot,
    listsPath,
    resultsPath,
  };
};

test('getParsingStatusUpdateDate returns replaysListPreparedAt when date is valid', (t) => {
  const { tempRoot, listsPath, resultsPath } = createTempPaths();

  t.after(() => {
    fs.removeSync(tempRoot);
  });

  fs.writeFileSync(
    path.join(listsPath, 'replaysList.json'),
    JSON.stringify({ replaysListPreparedAt: '2026-02-15T12:34:56.000Z' }),
  );
  fs.writeFileSync(path.join(resultsPath, 'stats.zip'), 'stub');

  const result = getParsingStatusUpdateDate(listsPath, resultsPath);

  assert.equal(result.toISOString(), '2026-02-15T12:34:56.000Z');
});

test('getParsingStatusUpdateDate falls back to replaysList.json mtime when field is missing', (t) => {
  const { tempRoot, listsPath, resultsPath } = createTempPaths();

  t.after(() => {
    fs.removeSync(tempRoot);
  });

  const replaysListPath = path.join(listsPath, 'replaysList.json');
  const expectedFallback = new Date('2026-02-15T13:00:00.000Z');

  fs.writeFileSync(
    replaysListPath,
    JSON.stringify({ parsedReplays: [], replays: [], problematicReplays: [] }),
  );
  fs.utimesSync(replaysListPath, expectedFallback, expectedFallback);

  fs.writeFileSync(path.join(resultsPath, 'stats.zip'), 'stub');

  const result = getParsingStatusUpdateDate(listsPath, resultsPath);

  assert.equal(result.toISOString(), expectedFallback.toISOString());
});

test('getParsingStatusUpdateDate falls back to stats.zip mtime when replaysList is unreadable', (t) => {
  const { tempRoot, listsPath, resultsPath } = createTempPaths();

  t.after(() => {
    fs.removeSync(tempRoot);
  });

  const statsZipPath = path.join(resultsPath, 'stats.zip');
  const expectedFallback = new Date('2026-02-15T14:00:00.000Z');

  fs.writeFileSync(path.join(listsPath, 'replaysList.json'), '{');
  fs.writeFileSync(statsZipPath, 'stub');
  fs.utimesSync(statsZipPath, expectedFallback, expectedFallback);

  const result = getParsingStatusUpdateDate(listsPath, resultsPath);

  assert.equal(result.toISOString(), expectedFallback.toISOString());
});

test('getParsingStatusUpdateDate falls back to current time when all sources are unavailable', () => {
  const before = Date.now();
  const result = getParsingStatusUpdateDate('/missing/lists', '/missing/results');
  const after = Date.now();

  assert.ok(result.getTime() >= before);
  assert.ok(result.getTime() <= after);
});
