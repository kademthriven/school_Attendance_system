const sequelize = require("../config/database");

const StudentModel = require("./Student");
const AttendanceModel = require("./Attendance");

const Student = StudentModel(sequelize);
const Attendance = AttendanceModel(sequelize);

Student.hasMany(Attendance,{foreignKey:"studentId"});
Attendance.belongsTo(Student,{foreignKey:"studentId"});

module.exports = { sequelize, Student, Attendance };