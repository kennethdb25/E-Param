const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookName: {
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
  imgpath: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  QRCode: {
    type: String,
    required: true,
  },
})
