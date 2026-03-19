const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Student = require('./student')(sequelize, DataTypes);
db.Attendance = require('./attendance')(sequelize, DataTypes);

// Associations
db.Student.hasMany(db.Attendance, { foreignKey: 'studentId' });
db.Attendance.belongsTo(db.Student, { foreignKey: 'studentId' });

module.exports = db;