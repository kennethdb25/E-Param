const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
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
  ratings: {
    type: Number,
    required: false,
  },
  genre: {
    type: String,
    required: true,
  },
  bookRatingsCount: {
    type: Number,
  },
  totalRatings: {
    type: Number,
  },
  ratings: {
    type: Number,
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
  created: {
    type: Date,
    required: true,
  },
  QRCode: {
    type: String,
    required: true,
  },
})

const BookModel = new mongoose.model("BookInfo", BookSchema);

module.exports = BookModel;
