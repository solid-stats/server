const test = require('node:test');
const assert = require('node:assert/strict');

const { getStartOfHour } = require('./date');

test('getStartOfHour truncates date to start of hour', () => {
  const sourceDate = new Date('2024-01-01T10:37:52.123Z');

  const result = getStartOfHour(sourceDate);

  assert.equal(result.toISOString(), '2024-01-01T10:00:00.000Z');
  assert.equal(sourceDate.toISOString(), '2024-01-01T10:37:52.123Z');
});
