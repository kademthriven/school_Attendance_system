const express = require('express');
const router = express.Router();
const controller = require('../controllers/attendanceController');

router.get('/:date', controller.getAttendanceByDate);
router.post('/:date', controller.markAttendance);
router.get('/', controller.getReport);

module.exports = router;