const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://postgres:larousse@localhost:5432/messenger",
  {
    logging: false,
  }
);

module.exports = db;
