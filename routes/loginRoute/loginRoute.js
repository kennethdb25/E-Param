const express = require('express');
const SignInRouter = new express.Router();
const StudentModel = require("../../models/studentModel");
const LibrarianModel = require('../../models/librarianModel');
const AdminModel = require('../../models/adminModel');
const cipher = require('bcryptjs');
const [authenticateStudent, authenticateLibrarian, authenticateAdmin] = require('../../middleware/authenticate');

// LOGIN

// STUDENT LOGIN
SignInRouter.post('/student/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userEmail = await StudentModel.findOne({ email: email, acctStatus: "Active" });
    if (userEmail) {
      const isMatch = await cipher.compare(password, userEmail.password)
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid Email or Password" });
        // validation for pending or disabled accounts
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

// LIBRARIAN LOGIN
SignInRouter.post('/librarian/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userEmail = await LibrarianModel.findOne({ email: email });
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

// ADMIN LOGIN
SignInRouter.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userEmail = await AdminModel.findOne({ email: email });
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

// END OF LOGIN

// VALIDATE

// VALIDATE STUDENT LOGIN
SignInRouter.get('/student/valid', authenticateStudent, async (req, res) => {
  try {
    const validUser = await StudentModel.findOne({ _id: req.userId });
    return res.status(201).json({ validUser });
  } catch (error) {
    return res.status(401).json({ status: 401, error });
  }
});

// VALIDATE LIBRARIAN LOGIN
SignInRouter.get('/librarian/valid', authenticateLibrarian, async (req, res) => {
  try {
    const validUser = await LibrarianModel.findOne({ _id: req.userId });
    return res.status(201).json({ validUser });
  } catch (error) {
    console.log(error);
  }
});

// VALIDATE ADMIN LOGIN
SignInRouter.get('/admin/valid', authenticateAdmin, async (req, res) => {
  try {
    const validUser = await AdminModel.findOne({ _id: req.userId });
    return res.status(201).json({ validUser });
  } catch (error) {
    console.log(error);
  }
});

// END OF VALIDATE

// LOGOUT

// LOGOUT STUDENT
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

// LOGOUT LIBRARIAN
SignInRouter.get('/librarian/logout', authenticateLibrarian, async (req, res) => {
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

// LOGOUT ADMIN
SignInRouter.get('/admin/logout', authenticateAdmin, async (req, res) => {
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

// END OF LOGOUT

module.exports = SignInRouter;
