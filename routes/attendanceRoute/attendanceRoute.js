const express = require("express");
const StudentModel = require("../../models/studentModel");
const AttendanceModel = require("../../models/attendanceModel");
const AnnouncementModel = require("../../models/annoucementModel");
const AttendanceRouter = new express.Router();

AttendanceRouter.post("/add-attendance", async (req, res) => {
  const studentId = req.query.studentId || "";

  const studentInfo = await StudentModel.findOne({ studentId: studentId });

  if (studentInfo) {
    const preCheckAttendance = await AttendanceModel.findOne({
      studentId: studentId,
    })
      .sort({ attendanceDate: -1 })
      .limit(1);

    const finalRecord = new AttendanceModel({
      studentName: `${studentInfo.lastName}, ${studentInfo.firstName} ${studentInfo.middleName}`,
      studentId: studentId,
      studentEmail: studentInfo.email,
      studentGrade: studentInfo.grade,
      studentSection: studentInfo.section,
      attendanceStatus:
        preCheckAttendance && preCheckAttendance.attendanceStatus === "TIME-IN"
          ? "TIME-OUT"
          : "TIME-IN",
      attendanceDate: new Date().toISOString(),
    });

    const storeRecord = await finalRecord.save();
    return res.status(201).json({ status: 201, body: storeRecord });
  } else {
    return res.status(404).json({ error: "No Record of the student" });
  }
});

AttendanceRouter.get("/get-attendance", async (req, res) => {
  try {
    const students = await AttendanceModel.find({
      attendanceDate: { $gte: new Date().toDateString() },
    });
    const distintStudentId = students
      .map((item) => item.studentId)
      .filter(
        (studId, index, currentVal) => currentVal.indexOf(studId) === index
      );
    const timeIn = await AttendanceModel.find({
      attendanceStatus: "TIME-IN",
      attendanceDate: { $gte: new Date().toDateString() },
    });

    const timeOut = await AttendanceModel.find({
      attendanceStatus: "TIME-OUT",
      attendanceDate: { $gte: new Date().toDateString() },
    });

    return res.status(201).json({
      status: 201,
      body: [distintStudentId.length, timeIn.length, timeOut.length],
    });
  } catch (error) {
    return res.status(404).json({ error: "No Record of the student" });
  }
});

AttendanceRouter.post("/add-announcement", async (req, res) => {
  const { content } = req.body;
  try {
    const getAnnouncementCount = await AnnouncementModel.find().count();

    const finalRecord = await new AnnouncementModel({
      announcementId: getAnnouncementCount + 1,
      content,
      status: "Not Active",
    });

    const storeData = await finalRecord.save();

    return res.status(201).json({ status: 201, body: storeData });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

AttendanceRouter.get("/get-announcement", async (req, res) => {
  try {
    const getAllAnnouncement = await AnnouncementModel.find().sort({
      announcementId: -1,
    });
    return res.status(200).json({ status: 200, body: getAllAnnouncement });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

AttendanceRouter.get("/get-active-announcement", async (req, res) => {
  try {
    const getActiveAnnouncement = await AnnouncementModel.findOne({
      status: "Active",
    });
    return res.status(200).json({ status: 200, body: getActiveAnnouncement });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

AttendanceRouter.patch("/change-status-announcement", async (req, res) => {
  const id = req.query.announcementId || "";
  try {
    const getActiveAnnouncement = await AnnouncementModel.findOne({
      status: "Active",
    });
    if (getActiveAnnouncement && getActiveAnnouncement.announcementId !== id) {
      getActiveAnnouncement.status = "Not Active";

      await getActiveAnnouncement.save();
    }

    const toActivate = await AnnouncementModel.findOne({ announcementId: id });

    if (!toActivate) {
      return res
        .status(404)
        .json({ error: "Announcement to activate not found " });
    }

    toActivate.status =
      toActivate.status === "Active" ? "Not Active" : "Active";

    const changeSuccess = await toActivate.save();

    return res.status(200).json({ status: 200, body: changeSuccess });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

module.exports = AttendanceRouter;
