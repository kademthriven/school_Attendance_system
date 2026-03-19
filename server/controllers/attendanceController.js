const db = require('../models');
const Attendance = db.Attendance;
const Student = db.Student;

// ✅ GET attendance by date
exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const records = await Attendance.findAll({
      where: { date },
      include: { model: Student } // ✅ FIXED
    });

    // If attendance exists
    if (records.length > 0) {
      return res.json({
        exists: true,
        records: records.map(r => ({
          studentId: r.studentId,
          name: r.Student.name,
          status: r.status
        }))
      });
    }

    // If no attendance → return student list
    const students = await Student.findAll();

    res.json({
      exists: false,
      students
    });

  } catch (error) {
    console.error("GET ERROR:", error); // ✅ helpful debug
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ POST mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { date } = req.params;
    const { records } = req.body;

    // Optional: prevent duplicate entries
    const existing = await Attendance.findOne({ where: { date } });
    if (existing) {
      return res.status(400).json({ message: "Attendance already marked for this date" });
    }

    await Promise.all(records.map(r =>
      Attendance.create({
        date,
        studentId: r.studentId,
        status: r.status
      })
    ));

    res.json({ success: true });

  } catch (error) {
    console.error("POST ERROR:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ GET attendance report
exports.getReport = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: { model: Attendance } // ✅ FIXED
    });

    const report = students.map(s => {
      const total = s.Attendances.length;
      const attended = s.Attendances.filter(a => a.status === 'present').length;
      const percentage = total ? Math.round((attended / total) * 100) : 0;

      return {
        name: s.name,
        attended,
        total,
        percentage
      };
    });

    res.json(report);

  } catch (error) {
    console.error("REPORT ERROR:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};