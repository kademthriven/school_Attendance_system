module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    date: { type: DataTypes.DATEONLY, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false }
  });
  return Attendance;
};