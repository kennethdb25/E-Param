const express = require("express");
const BorrowBookRouter = new express.Router();
const BookModel = require("../../models/bookModel");
const ReserveBookModel = require("../../models/reserveBookModel.js");

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
    const validate = await ReserveBookModel.findOne({ bookId: _id });
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
})

module.exports = BorrowBookRouter;
