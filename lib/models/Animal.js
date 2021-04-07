const pool = require('../utils/pool');

module.exports = class Animal {
  id;
  name;
  dayOrNight;
  furry;
  numberOfLegs;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dayOrNight = row.day_or_night;
    this.furry = row.furry;
    this.numberOfLegs = row.number_of_legs;
  }

  static async insert({ name, dayOrNight, furry, numberOfLegs }) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO animals (name, day_or_night, furry, number_of_legs) VALUES ($1, $2, $3, $4) RETURNING *)`,
      [name, dayOrNight, furry, numberOfLegs]
    );
    return new Animal(rows[0]);
  }
};
