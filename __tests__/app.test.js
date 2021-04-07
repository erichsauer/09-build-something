const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('09-build-something routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let testPlant;
  beforeEach(async () => {
    testPlant = await request(app).post({
      name: 'planty',
      favorite_season: 'spring',
      flowering: true,
      zone: 9,
    });
  });

  it('should get the test plant when hit', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual(testPlant);
  });
});
