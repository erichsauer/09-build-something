const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const animal = await Animal.insert(req.body);
      res.send(animal);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const animals = await Animal.retrieve();
      res.send(animals);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const animal = await Animal.retrieve(req.params.id);
      res.send(animal);
    } catch (e) {
      next(e);
    }
  });
