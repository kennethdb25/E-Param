const mongoose = require('mongoose');

const ReserveBookSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  libraryCardNum: {
    type: String,
  },
  userType: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  publication: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  assession: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  imgpath: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  dateReserved: {
    type: Date,
    required: true,
  },
  QRCode: {
    type: String,
    required: true,
  },
  lostPenalty: {
    type: String,
    required: true,
  },
  bldgStock: {
    type: String,
    required: true,
  },
});

const ReserveBookModel = new mongoose.model('ReserveBookInfo', ReserveBookSchema);

module.exports = ReserveBookModel;
