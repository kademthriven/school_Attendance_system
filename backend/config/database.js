const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "attendance_system",
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
    logging:false
  }
);

module.exports = sequelize;