const express = require('express');
const BorrowBookRouter = new express.Router();
const BookModel = require('../../models/bookModel');
const ReserveBookModel = require('../../models/reserveBookModel.js');
const BorrowBookModel = require('../../models/borrowBookModel');

// ADD BOOK AS BORROWED
BorrowBookRouter.post('/book/add-shelf', async (req, res) => {
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
    bldgStock,
    lostPenalty,
    userType,
    qty,
    _id,
    libraryCardNum,
  } = req.body;

  // validate if book is existing
  const availableBook = await BookModel.findOne({
    _id: _id,
    status: 'Available',
  });

  if (availableBook) {
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
      bldgStock,
      lostPenalty,
      userType,
      bookId: _id,
      libraryCardNum,
      status: 'Reserved',
      dateReserved: new Date().toISOString(),
    });
    if (qty === 1) {
      availableBook.status = 'Reserved';
      availableBook.qty = 0;
      await availableBook.save();
    } else {
      availableBook.qty = qty - 1;
      await availableBook.save();
    }

    const storeRecord = await finalRecord.save();
    return res.status(201).json({ status: 201, body: storeRecord });
  } else {
    return res.status(404).json({ error: 'Book is already reserved' });
  }
});

BorrowBookRouter.post('/book/add-borrowed', async (req, res) => {
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
    libraryCardNum,
    lastName,
    location,
    middleName,
    notes,
    publication,
    section,
    studentId,
    bldgStock,
    lostPenalty,
    title,
    _id,
  } = req.body;
  // validate book if already processed
  try {
    const validate = await ReserveBookModel.findOne({
      _id,
      status: 'Reserved',
    });
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
        libraryCardNum,
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
        bldgStock,
        lostPenalty,
        title,
        status: 'Borrowed',
        reservationId: _id,
        dateBorrowed: new Date().toISOString(),
        returnDate: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
      });

      validate.status = 'Processed';
      await validate.save();

      const storeRecord = await finalRecord.save();
      return res.status(201).json({ status: 201, body: storeRecord });
    } else {
      return res.status(500).json({ error: 'Book is already processed' });
    }
  } catch (error) {
    console.log(error);
  }
});

// get all recently borrowed books per student
BorrowBookRouter.get('/book/student-recently-borrowed', async (req, res) => {
  const all = req.query.email || '';
  try {
    const borrowedBooks = await BorrowBookModel.find({ email: all }).sort({ dateBorrowed: -1 }).limit(14);
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get all recently borrowed books for librarian and admin
BorrowBookRouter.get('/book/all-recently-borrowed', async (req, res) => {
  try {
    const borrowedBooks = await BorrowBookModel.find().sort({ dateBorrowed: -1 }).limit(14);
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// process return book
BorrowBookRouter.patch('/book/process-return/:_id', async (req, res) => {
  try {
    const id = req.params._id;

    const checkIfBookIsNotProcessed = await BorrowBookModel.findOne({
      _id: id,
    });

    const bookToChangeInAvailable = await BookModel.findOne({
      isbn: checkIfBookIsNotProcessed.isbn,
    });
    if (checkIfBookIsNotProcessed) {
      checkIfBookIsNotProcessed.status = 'Returned';
      checkIfBookIsNotProcessed.dateReturned = new Date().toISOString();
      checkIfBookIsNotProcessed.isRated = false;

      if (bookToChangeInAvailable.status === 'Available' && bookToChangeInAvailable.qty > 0) {
        bookToChangeInAvailable.qty = bookToChangeInAvailable.qty + 1;
        await bookToChangeInAvailable.save();
      } else {
        bookToChangeInAvailable.qty = bookToChangeInAvailable.qty + 1;
        bookToChangeInAvailable.status = 'Available';
        await bookToChangeInAvailable.save();
      }

      const proccessBook = await checkIfBookIsNotProcessed.save();

      return res.status(200).json({ status: 200, body: { proccessBook } });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

// process lost book
BorrowBookRouter.patch('/book/process-lost/:_id', async (req, res) => {
  try {
    const id = req.params._id;

    const checkIfBookIsNotProcessed = await BorrowBookModel.findOne({
      _id: id,
      status: 'Borrowed',
    });

    if (checkIfBookIsNotProcessed) {
      checkIfBookIsNotProcessed.status = 'Lost';
      checkIfBookIsNotProcessed.dateLost = new Date().toISOString();

      const proccessBook = await checkIfBookIsNotProcessed.save();

      return res.status(200).json({ status: 200, body: proccessBook });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {}
});

// book rate
BorrowBookRouter.patch('/book-rate', async (req, res) => {
  try {
    const { _id: id, value } = req.query;

    const checkIfBookIsNotRated = await BorrowBookModel.findOne({
      _id: id,
      isRated: false,
      status: 'Returned',
    });

    const bookToAddRatings = await BookModel.findOne({
      isbn: checkIfBookIsNotRated.isbn,
    });

    let bookRateCount = parseInt(bookToAddRatings.bookRatingsCount) + 1;
    let totalRateFromStudent = parseFloat(bookToAddRatings.totalRatings) + parseInt(value);

    if (checkIfBookIsNotRated) {
      checkIfBookIsNotRated.isRated = true;
      checkIfBookIsNotRated.ratings = value;

      bookToAddRatings.bookRatingsCount = parseInt(bookRateCount);
      bookToAddRatings.totalRatings = parseInt(totalRateFromStudent);
      bookToAddRatings.ratings = parseFloat(totalRateFromStudent / bookRateCount);

      const ratedBook = await checkIfBookIsNotRated.save();

      const addRatings = await bookToAddRatings.save();

      return res.status(200).json({ status: 200, body: { ratedBook, addRatings } });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

module.exports = BorrowBookRouter;
