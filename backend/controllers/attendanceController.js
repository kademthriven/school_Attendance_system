const { Attendance, Student } = require("../models");

exports.markAttendance = async (req,res)=>{

const { date, attendance } = req.body;

for(const record of attendance){

await Attendance.create({
studentId:record.studentId,
status:record.status,
date:date
});

}

res.json({message:"Attendance saved"});

};


exports.getReport = async (req,res)=>{

const records = await Attendance.findAll({
include:Student
});

res.json(records);

};


exports.checkAttendance = async(req,res)=>{

const date=req.params.date;

const records = await Attendance.findAll({
where:{date},
include:Student
});

if(records.length>0){

return res.json({
exists:true,
records
});

}

res.json({exists:false});

};


exports.getAttendancePercentage = async (req,res)=>{

const students = await Student.findAll({
include:Attendance
});

let result=[];

students.forEach(student=>{

const total = student.Attendances.length;

const present = student.Attendances.filter(a=>a.status==="Present").length;

let percentage = 0;

if(total>0){
percentage = ((present/total)*100).toFixed(2);
}

result.push({
name:student.name,
totalClasses:total,
presentDays:present,
percentage:percentage
});

});

res.json(result);

};