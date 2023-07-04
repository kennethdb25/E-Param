const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  studentGrade: {
    type: String,
    required: true,
  },
  studentSection: {
    type: String,
    required: true,
  },
  attendanceStatus: {
    type: String,
    required: true,
  },
  attendanceDate: {
    type: Date,
    required: true,
  },
});

const AttendanceModel = new mongoose.model("attendanceInfo", AttendanceSchema);

module.exports = AttendanceModel;
