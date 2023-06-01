const express = require("express");
const multer = require("multer");
const StudentRegRouter = new express.Router();
const StudentModel = require("../../models/studentModel");

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}. ${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only image is allowed"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

// register student
StudentRegRouter.post("/student/register", upload.single("photo"), async (req, res) => {
  const { filename } = req.file;
  const {
    studentId,
    firstName,
    middleName,
    lastName,
    address,
    grade,
    section,
    gender,
    email,
    password,
    confirmPassword,
  } = req.body;

  // validate if student id exist
  const validate = await StudentModel.findOne({ studentId: studentId });
  if (validate) {
    return res.status(422).json({ error: "ID is already exists" });
  }

  try {
    const finalUser = new StudentModel({
      studentId,
      firstName,
      middleName,
      lastName,
      address,
      grade,
      section,
      imgPath: filename,
      userType: "Student",
      gender,
      email,
      password,
      confirmPassword,
    });

    const storeData = await finalUser.save();


    return res.status(201).json(storeData)
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

module.exports = StudentRegRouter;
