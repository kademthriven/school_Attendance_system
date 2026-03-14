const API="http://localhost:5000";

let students=[];
let attendance={};

async function searchAttendance(){

const date=document.getElementById("attendanceDate").value;

if(!date){
alert("Select date");
return;
}

const res=await fetch(`${API}/attendance/check/${date}`);
const data=await res.json();

if(data.exists){

alert("Attendance already marked");

showSummary(data.records);

return;

}

loadStudents();

}

async function loadStudents(){

const res=await fetch(`${API}/students`);
students=await res.json();

const container=document.getElementById("studentList");

container.innerHTML="";

students.forEach(s=>{

container.innerHTML+=`

<div class="student-row">

<div class="student-name">${s.name}</div>

<div>
<input type="radio" name="att-${s.id}" onclick="setStatus(${s.id},'Present')"> Present
</div>

<div>
<input type="radio" name="att-${s.id}" onclick="setStatus(${s.id},'Absent')"> Absent
</div>

<div id="result-${s.id}" class="status-icon"></div>

</div>

`;

});

}

function setStatus(id,status){
attendance[id]=status;
}

async function markAttendance(){

const date=document.getElementById("attendanceDate").value;

const list=[];

for(let id in attendance){

list.push({
studentId:id,
status:attendance[id]
});

}

await fetch(`${API}/attendance/mark`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
date:date,
attendance:list
})

});

for(let id in attendance){

const div=document.getElementById(`result-${id}`);

if(attendance[id]==="Present"){
div.innerHTML=`<i class="fa-solid fa-check text-success fs-4"></i>`;
}else{
div.innerHTML=`<i class="fa-solid fa-xmark text-danger fs-4"></i>`;
}

}

alert("Attendance saved");

}

async function fetchReport(){

const res=await fetch(`${API}/attendance/report`);
const data=await res.json();

showSummary(data);

}

function showSummary(records){

const table=document.getElementById("reportTable");

table.innerHTML="";

records.forEach(r=>{
	table.innerHTML+=`
	<tr>
		<td>${r.Student.name}</td>
		<td>${r.status === "Present" ? '<i class="fa-solid fa-check text-success fs-4"></i>' : '<i class="fa-solid fa-xmark text-danger fs-4"></i>'}</td>
		<td>${r.date}</td>
	</tr>
	`;
});

}

async function loadPercentage(){

const res=await fetch(`${API}/attendance/percentage`);
const data=await res.json();

const table=document.getElementById("percentageTable");

table.innerHTML="";

data.forEach(s=>{

table.innerHTML+=`

<tr>

<td>${s.name}</td>
<td>${s.totalClasses}</td>
<td>${s.presentDays}</td>
<td>${s.percentage}%</td>

</tr>

`;

});

}