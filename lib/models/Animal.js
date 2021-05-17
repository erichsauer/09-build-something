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
      `INSERT INTO animals (name, day_or_night, furry, number_of_legs) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, dayOrNight, furry, numberOfLegs]
    );
    return new Animal(rows[0]);
  }

  static async retrieve(id) {
    if (id) {
      const { rows } = await pool.query(`SELECT * FROM animals WHERE id=$1`, [
        id,
      ]);
      return new Animal(rows[0]);
    } else {
      const { rows } = await pool.query(`SELECT * FROM animals`);
      return rows.map((row) => new Animal(row));
    }
  }

  static async update(id, { name, dayOrNight, furry, numberOfLegs }) {
    const {
      rows,
    } = await pool.query(
      `UPDATE animals SET name=$1, day_or_night=$2, furry=$3, number_of_legs=$4 WHERE id=$5 RETURNING *`,
      [name, dayOrNight, furry, numberOfLegs, id]
    );
    return new Animal(rows[0]);
  }

  static async delete(id) {
    const {
      rows,
    } = await pool.query(`DELETE FROM animals WHERE id=$1 RETURNING *`, [id]);
    return new Animal(rows[0]);
  }
};
