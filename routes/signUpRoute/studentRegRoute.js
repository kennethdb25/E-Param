const express = require('express');
const multer = require('multer');
const StudentRegRouter = new express.Router();
const StudentModel = require('../../models/studentModel');
const QRCode = require('qrcode');
const GradeSectionModel = require('../../models/gradeSectionModel');

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new Error('Only image is allowed'));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

// register student
StudentRegRouter.post('/student/register', upload.single('photo'), async (req, res) => {
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
  const validateEmail = await StudentModel.findOne({ email: email });

  if (validateEmail || validate) {
    return res.status(422).json({ error: 'Email or Student ID are already exists' });
  }

  try {
    const qrCode = await QRCode.toDataURL(studentId);
    const finalUser = new StudentModel({
      studentId: studentId.toString().toUpperCase(),
      firstName: firstName.toUpperCase(),
      middleName: middleName.toUpperCase(),
      lastName: lastName.toUpperCase(),
      address: address.toUpperCase(),
      grade,
      section,
      imgpath: filename,
      userType: 'Student',
      acctStatus: 'Pending',
      QRCode: qrCode,
      created: new Date().toISOString(),
      gender,
      email,
      password,
      confirmPassword,
    });

    const storeData = await finalUser.save();

    return res.status(201).json(storeData);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// GET PENDING STUDENT ACCOUNT
StudentRegRouter.get('/student/pending', async (req, res) => {
  try {
    const pendingAccounts = await StudentModel.find();
    return res.status(200).json({ status: 200, body: pendingAccounts });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// APPROVE PENDING ACCOUNT
StudentRegRouter.patch('/student/approve/:_id', async (req, res) => {
  try {
    const id = req.params._id;

    const getPendingAccount = await StudentModel.findOne({ _id: id });

    if (!getPendingAccount) {
      return res.status(422).json({ error: `No account match` });
    } else {
      getPendingAccount.acctStatus = 'Active';

      const approveAccount = await getPendingAccount.save();

      return res.status(200).json({ status: 200, approveAccount });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

//GET STUDENT INFO FOR PROCESSING RESERVED BOOK
StudentRegRouter.get('/student/get-info', async (req, res) => {
  const info = req.query.studentId || '';
  try {
    const getStudentInfo = await StudentModel.findOne({ studentId: info });
    return res.status(200).json({ status: 200, body: getStudentInfo });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

StudentRegRouter.get('/get-section', async (req, res) => {
  const grade = req.query.grade || '';
  try {
    const students = await GradeSectionModel.aggregate([
      {
        $match: {
          status: 'Active',
        },
      },
      {
        $group: {
          _id: '$grade',
          uniqueValues: {
            $addToSet: '$section',
          },
        },
      },
    ]);
    const data = students.filter((a) => a._id === grade);

    return res.status(200).json({
      status: 200,
      body: data.length > 0 ? data[0].uniqueValues.sort() : [],
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

StudentRegRouter.post('/add-section', async (req, res) => {
  const { grade, section } = req.body;
  try {
    const getSectionExist = await GradeSectionModel.find({
      grade: grade,
      section: section,
    });
    const getSectionCount = await GradeSectionModel.find().count();

    if (getSectionExist.length > 0) {
      return res.status(422).json({ error: 'Section already exists ' });
    }

    const finalRecord = await new GradeSectionModel({
      sectionId: getSectionCount + 1,
      grade,
      section: section.toUpperCase(),
      status: 'Active',
    });

    const storeData = await finalRecord.save();

    return res.status(201).json({ status: 201, body: storeData });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

StudentRegRouter.get('/get-all-section', async (req, res) => {
  try {
    const getAllSection = await GradeSectionModel.find();
    return res.status(200).json({ status: 200, body: getAllSection });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

StudentRegRouter.patch('/change-status-section', async (req, res) => {
  const id = req.query.sectionId || '';
  try {
    const getSection = await GradeSectionModel.findOne({ sectionId: id });

    if (!getSection) {
      return res.status(404).json({ error: 'Section not found ' });
    }
    getSection.status = getSection.status === 'Active' ? 'Inactive' : 'Active';

    const changeSuccess = await getSection.save();
    return res.status(200).json({ status: 200, body: changeSuccess });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

module.exports = StudentRegRouter;
