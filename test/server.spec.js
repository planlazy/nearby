/* global describe, expect, it */

const wreck = require('wreck');

const staticContent = require('../public/test.json');
const main = require('../server/index');

describe('Route', () => {
  test('Health', async done => {
    try {
      await main.start({ showOutput: false });

      const { payload } = await wreck.get('http://localhost:8181/health', { json: true });

      const received = payload.status.toLowerCase();
      const expected = 'good';

      expect(received).toBe(expected);

      await main.stop();

      done();
    } catch (error) {
      console.error(error);
      done();
    }
  });
});

describe('Static Content', () => {
  test('JSON File System', () => {
    const received = staticContent['static-content'];
    const expected = 'unit test';

    expect(received).toBe(expected);
  });

  test('JSON Route', async done => {
    try {
      await main.start({ showOutput: false });

      const { payload } = await wreck.get('http://localhost:8181/test.json', { json: true });

      const received = payload['static-content'];
      const expected = 'unit test';

      expect(received).toBe(expected);

      await main.stop();

      done();
    } catch (error) {
      console.error(error);
      done();
    }
  });
});
