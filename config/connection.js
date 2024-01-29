const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize('sneakers_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889 || 3306,
  });
}

module.exports = sequelize;
