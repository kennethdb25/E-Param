const express = require("express");
const multer = require("multer");
const LibrarianRegRouter = new express.Router();
const LibrarianModel = require("../../models/librarianModel");

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
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

// register admin
LibrarianRegRouter.post("/librarian/register", upload.single("photo"), async (req, res) => {
  const { filename } = req.file;
  const {
    employeeId,
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
  } = req.body;

  // validate if employee id exist
  const validate = await LibrarianModel.findOne({ employeeId: employeeId });
  if (validate) {
    return res.status(422).json({ error: "ID is already exists" });
  }

  try {
    const finalUser = new LibrarianModel({
      employeeId,
      firstName,
      middleName,
      lastName,
      imgpath: filename,
      userType: "Librarian",
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

module.exports = LibrarianRegRouter;