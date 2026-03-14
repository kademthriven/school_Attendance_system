const { Student } = require("../models");

exports.getStudents = async (req,res)=>{

const students = await Student.findAll();

res.json(students);

};