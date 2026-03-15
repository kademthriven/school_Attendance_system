const express = require("express");
const cors = require("cors");

const { sequelize, Student } = require("./models");

const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students",studentRoutes);
app.use("/attendance",attendanceRoutes);

const PORT = 5000;

async function startServer(){

await sequelize.sync();

// Clear attendance records for a fresh start
const { Attendance } = require("./models");
await Attendance.destroy({ where: {} });

const count = await Student.count();
if(count===0){
	await Student.bulkCreate([
		{name:"Siva"},
		{name:"Rajesh"},
		{name:"Ashok"},
		{name:"Sai"},
		{name:"Kiran"},
		{name:"Arjun"},
		{name:"Vikram"},
		{name:"Rahul"},
		{name:"Anil"},
		{name:"Mahesh"}
	]);
}
app.listen(PORT,()=>{
	console.log(`Server running on port ${PORT}`);
});
}
startServer();