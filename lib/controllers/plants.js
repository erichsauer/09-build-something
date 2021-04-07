const { Router } = require('express');
const Plant = require('../models/Plant');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const plant = await Plant.insert(req.body);
      res.send(plant);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const plants = await Plant.retrieve();
      res.send(plants);
    } catch (e) {
      next(e);
    }
  });
