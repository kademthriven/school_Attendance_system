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
}).catch((error) => {
    console.error('Failed to sync database:', error);
    process.exit(1);
});

// // Generic error handler middleware
// app.use((err, req, res, next) => {
//     console.error('Unhandled error:', err);
//     res.status(500).json({ error: 'Internal server error' });
// });