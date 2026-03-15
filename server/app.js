const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const db = require('./models');
const attendanceRoutes = require('./routes/attendance');

app.use(cors());
app.use(express.json());
app.use('/api/attendance', attendanceRoutes);

db.sequelize.sync({ force: true }).then(() => {
    console.log("Database has been reset and synced.");
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});