const { DataTypes } = require("sequelize");

module.exports = (sequelize)=>{

const Attendance = sequelize.define("Attendance",{

id:{
type:DataTypes.INTEGER,
autoIncrement:true,
primaryKey:true
},

date:{
type:DataTypes.DATEONLY
},

status:{
type:DataTypes.STRING
},

studentId:{
type:DataTypes.INTEGER
}

});

return Attendance;

};