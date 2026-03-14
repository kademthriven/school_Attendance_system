const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

router.post("/mark",attendanceController.markAttendance);

router.get("/report",attendanceController.getReport);

router.get("/check/:date",attendanceController.checkAttendance);

router.get("/percentage",attendanceController.getAttendancePercentage);

module.exports = router;