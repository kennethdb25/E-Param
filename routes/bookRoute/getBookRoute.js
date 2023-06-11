const express = require("express");
const GetBookRouter = new express.Router();
const BookModel = require("../../models/bookModel");

// get new books
GetBookRouter.get("/book/get-new", async (req, res) => {
  try {
    const newBooks = await BookModel.find({ status: "Available" }).sort({ created: -1 }).limit(10);
    return res.status(200).json({ status: 200, body: newBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

module.exports = GetBookRouter;
