const express = require('express');
const router = express.Router();
const db = require('../models');
const Attendance = db.Attendance;

const students = ["Siva","Rajesh","Ashok","Sai","Haritha","Ram","Krishna","Anu","Ammu","Adi","Venkat"];

// GET attendance by date
router.get('/:date', async (req, res) => {
  const { date } = req.params;
  const records = await Attendance.findAll({ where: { date } });

  if (records.length > 0) {
    res.json({ exists: true, records });
  } else {
    res.json({ exists: false, students });
  }
});

// POST mark attendance
router.post('/:date', async (req, res) => {
  const { date } = req.params;
  const { records } = req.body;

  await Promise.all(records.map(r => Attendance.create({ date, name: r.name, status: r.status })));
  res.json({ success: true });
});

// GET report
router.get('/', async (req, res) => {
  const report = [];
  for (const s of students) {
    const records = await Attendance.findAll({ where: { name: s } });
    const attended = records.filter(r => r.status === 'present').length;
    const total = records.length;
    const percentage = total ? Math.round((attended / total) * 100) : 0;
    report.push({ name: s, attended, total, percentage });
  }
  res.json(report);
});

module.exports = router;