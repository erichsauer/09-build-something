const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('plant routes', () => {
  beforeEach(() => setup(pool));

  let testPlant;
  beforeEach(async () => {
    const { body } = await request(app).post('/api/v1/plants').send({
      name: 'planty',
      favoriteSeason: 'spring',
      flowering: true,
      zone: 9,
    });
    testPlant = body;
  });

  it('should add a plant', async () => {
    const res = await request(app).post('/api/v1/plants').send({
      name: 'flower pal',
      favoriteSeason: 'summer',
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

  it('should retrieve one plant by id', async () => {
    const res = await request(app).get(`/api/v1/plants/${testPlant.id}`);
    expect(res.body).toEqual(testPlant);
  });

  it('should update a plant by id', async () => {
    const res = await request(app).put(`/api/v1/plants/${testPlant.id}`).send({
      name: 'Plantsy',
      favoriteSeason: 'autumn',
      flowering: false,
      zone: 9,
    });
    expect(res.body).toEqual({
      id: testPlant.id,
      name: 'Plantsy',
      favoriteSeason: 'autumn',
      flowering: false,
      zone: 9,
    });
  });

  it('should delete a plant by id', async () => {
    const res = await request(app).delete(`/api/v1/plants/${testPlant.id}`);
    expect(res.body).toEqual(testPlant);
  });
});

describe('animal routes', () => {
  beforeEach(() => setup(pool));

  let testAnimal;
  beforeEach(async () => {
    const { body } = await request(app).post('/api/v1/animals').send({
      name: 'critter',
      dayOrNight: 'night',
      furry: true,
      numberOfLegs: 5,
    });
    testAnimal = body;
  });

  it('should add an animal', async () => {
    const { body } = await request(app).post('/api/v1/animals').send({
      name: 'skipper',
      dayOrNight: 'day',
      furry: false,
      numberOfLegs: 0,
    });
    expect(body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dayOrNight: expect.any(String),
      furry: expect.any(Boolean),
      numberOfLegs: expect.any(Number),
    });
  });

  it('should retrieve all animals', async () => {
    const { body } = await request(app).get('/api/v1/animals');
    expect(body[0]).toEqual(testAnimal);
  });

  it('should retrieve one animal by id', async () => {
    const { body } = await request(app).get(`/api/v1/animals/${testAnimal.id}`);
    expect(body).toEqual(testAnimal);
  });

  it('should update an animal by id', async () => {
    const { body } = await request(app)
      .put(`/api/v1/animals/${testAnimal.id}`)
      .send({
        name: 'flutter-by',
        dayOrNight: 'day',
        furry: false,
        numberOfLegs: 6,
      });
    expect(body).toEqual({
      id: testAnimal.id,
      name: 'flutter-by',
      dayOrNight: 'day',
      furry: false,
      numberOfLegs: 6,
    });
  });
});

afterAll(() => pool.end());
