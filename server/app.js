const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const db = require('./models');

const attendanceRoutes = require('./routes/attendance');
const { FORCE } = require('sequelize/lib/index-hints');

app.use(cors());
app.use(express.json());

app.use('/api/attendance', attendanceRoutes);

// DB sync + insert students
db.sequelize.sync({force: true}).then(async () => {

  const count = await db.Student.count();

  if (count === 0) {
    await db.Student.bulkCreate([
      { name: "Siva" },
      { name: "Rajesh" },
      { name: "Ashok" },
      { name: "Sai" },
      { name: "Haritha" },
      { name: "Ram" },
      { name: "Krishna" },
      { name: "Anu" },
      { name: "Ammu" },
      { name: "Adi" },
      { name: "Venkat" }
    ]);
    console.log("Students inserted");
  }

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });

}).catch(err => {
  console.error(err);
});