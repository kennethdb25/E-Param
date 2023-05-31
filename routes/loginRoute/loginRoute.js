const express = require('express');
const SignInRouter = new express.Router();
const StudentModel = require("../../models/studentModel");
const cipher = require('bcryptjs');
const authenticateStudent = require('../../middleware/authenticate');

// STUDENT LOGIN
SignInRouter.post('/student/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userEmail = await StudentModel.findOne({ email: email });
    if (userEmail) {
      const isMatch = await cipher.compare(password, userEmail.password)
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Email or Password" });
      } else {
        const token = await userEmail.generateAuthToken();

        res.cookie('UserCookie', token, {
          expire: new Date(Date.now + 604800000),
          httpOnly: true,
        });

        const result = {
          userEmail,
          token
        };
        return res.status(201).json({ status: 201, result });
      }
    } else {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.log(error);
  }
});

// VALIDATE STUDENT LOGIN
SignInRouter.get('/student/valid', authenticateStudent, async (req, res) => {
  try {
    const validUser = await StudentModel.findOne({ _id: req.userId });
    return res.status(201).json({ validUser });
  } catch (error) {
    console.log(error);
  }
});

// LOGOUT USER
SignInRouter.get('/student/logout', authenticateStudent, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currElem) => {
      return currElem != req.token;
    });

    res.clearCookie('UserCookie', { path: '/' });

    req.rootUser.save();

    return res.status(201).json({ status: 201 });
  } catch (error) {
    console.log(error);
  }
});

module.exports = SignInRouter;
