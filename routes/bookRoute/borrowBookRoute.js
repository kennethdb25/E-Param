const express = require("express");
const BorrowBookRouter = new express.Router();
const BookModel = require("../../models/bookModel");
const ReserveBookModel = require("../../models/reserveBookModel.js");
const BorrowBookModel = require("../../models/borrowBookModel");

// ADD BOOK AS BORROWED
BorrowBookRouter.post("/book/add-shelf", async (req, res) => {
  const {
    QRCode,
    abstract,
    assession,
    author,
    desc,
    email,
    firstName,
    genre,
    grade,
    imgpath,
    isbn,
    lastName,
    location,
    middleName,
    notes,
    publication,
    section,
    studentId,
    title,
    _id,
  } = req.body;

  // validate if book is existing
  const availableBook = await BookModel.findOne({ _id: _id, status: "Available" });

  if (availableBook) {
    const validate = await ReserveBookModel.findOne({ bookId: _id, status: "Reserved" });
    if (validate) {
      return res.status(404).json({ error: "Book is already reserved" });
    }
    const finalRecord = new ReserveBookModel({
      QRCode,
      abstract,
      assession,
      author,
      desc,
      email,
      firstName,
      genre,
      grade,
      imgpath,
      isbn,
      lastName,
      location,
      middleName,
      notes,
      publication,
      section,
      studentId,
      title,
      bookId: _id,
      status: "Reserved",
      dateReserved: new Date().toISOString(),
    });
    availableBook.status = "Reserved";
    await availableBook.save();

    const storeRecord = await finalRecord.save();
    return res.status(201).json({ status: 201, body: storeRecord });
  } else {
    return res.status(404).json({ error: "Book is already reserved" });
  }
});

BorrowBookRouter.post("/book/add-borrowed", async (req, res) => {
  const {
    QRCode,
    abstract,
    assession,
    author,
    desc,
    email,
    firstName,
    genre,
    grade,
    imgpath,
    isbn,
    lastName,
    location,
    middleName,
    notes,
    publication,
    section,
    studentId,
    title,
    _id,
  } = req.body;

  // validate book if already processed

  const validate = await ReserveBookModel.findOne({ _id, status: "Reserved" });
  if (validate) {
    const finalRecord = new BorrowBookModel({
      QRCode,
      abstract,
      assession,
      author,
      desc,
      email,
      firstName,
      genre,
      grade,
      imgpath,
      isbn,
      lastName,
      location,
      middleName,
      notes,
      publication,
      section,
      studentId,
      title,
      status: "Borrowed",
      reservationId: _id,
      dateBorrowed: new Date().toISOString(),
    });

    validate.status = "Processed";
    await validate.save();

    const storeRecord = await finalRecord.save();
    return res.status(201).json({ status: 201, body: storeRecord });
  } else {
    return res.status(500).json({ error: "Book is already processed" });
  }
});

// get all recently borrowed books per student
BorrowBookRouter.get("/book/student-recently-borrowed", async (req, res) => {
  const all = req.query.email || "";
  try {
    const borrowedBooks = await BorrowBookModel.find({ email: all }).sort({ dateBorrowed: -1 }).limit(10);
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});


// get all recently borrowed books for librarian and admin
BorrowBookRouter.get("/book/all-recently-borrowed", async (req, res) => {
  try {
    const borrowedBooks = await BorrowBookModel.find().sort({ dateBorrowed: -1 }).limit(10);
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

module.exports = BorrowBookRouter;
