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
    const { body } = await request(app).post('/api/v1/plants').send({
      name: 'planty',
      favorite_season: 'spring',
      flowering: true,
      zone: 9,
    });
    testPlant = body;
  });

  it('should add a plant when hit', async () => {
    const res = await request(app).post('/api/v1/plants').send({
      name: 'flower pal',
      favorite_season: 'summer',
      flowering: true,
      zone: 7,
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'flower pal',
      favoriteSeason: 'summer',
      flowering: true,
      zone: 7,
    });
  });

  it('should retrieve all plants', async () => {
    const res = await request(app).get(`/api/v1/plants`);
    expect(res.body[0]).toEqual(testPlant);
  });

  it('should retrieve one plant', async () => {
    const res = await request(app).get(`/api/v1/plants/${testPlant.id}`);
    expect(res.body).toEqual(testPlant);
  });
});
