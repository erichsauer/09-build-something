const pool = require('../utils/pool');

module.exports = class Plant {
  id;
  name;
  favoriteSeason;
  flowering;
  zone;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.favoriteSeason = row.favorite_season;
    this.flowering = row.flowering;
    this.zone = row.zone;
  }

  static async insert({ name, favorite_season, flowering, zone }) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO plants (name, favorite_season, flowering, zone) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, favorite_season, flowering, zone]
    );
    return new Plant(rows[0]);
  }

  static async retrieve(id) {
    if (id) {
      const { rows } = await pool.query(`SELECT * FROM plants`);
      return new Plant(rows[0]);
    } else {
      const { rows } = await pool.query(`SELECT * FROM plants WHERE id=$1`, [
        id,
      ]);
      return rows.map((row) => new Plant(row));
    }
  }
};
