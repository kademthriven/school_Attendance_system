module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Attendance;
};