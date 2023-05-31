const express = require("express");
const StudentRegRouter = new express.Router();
const StudentModel = require("../../models/studentModel");

// register student
StudentRegRouter.post("/student/register", async (req, res) => {
  const {
    studentId,
    firstName,
    middleName,
    lastName,
    address,
    gradeSection,
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
      gradeSection,
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
