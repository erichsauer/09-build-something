const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const animal = await Animal.insert(req.body);
    res.send(animal);
  } catch (e) {
    next(e);
  }
});
