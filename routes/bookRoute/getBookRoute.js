const express = require("express");
const GetBookRouter = new express.Router();
const BookModel = require("../../models/bookModel");
const ReserveBookModel = require("../../models/reserveBookModel.js");

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

// Get all available books
GetBookRouter.get("/book/get-available", async (req, res) => {
  try {
    const newBooks = await BookModel.find({ status: "Available" });
    return res.status(200).json({ status: 200, body: newBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// Get all reserve books
GetBookRouter.get("/book/get-reserved", async (req, res) => {
  try {
    const borrowedBooks = await ReserveBookModel.find();
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get borrowed books per student
GetBookRouter.get("/book/student-shelf", async (req, res) => {
  const all = req.query.email || "";
  try {
    const borrowedBooks = await ReserveBookModel.find({ email: all });
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});
// get availble books per genre
GetBookRouter.get("/book/get-genre", async (req, res) => {
  try {
    let data = []
    const getGenre = await BookModel.aggregate(
      [
        {
          '$group': {
            '_id': '$genre',
            'uniqueValues': {
              '$addToSet': '$genre'
            }
          }
        }
      ]
    )
    getGenre.map((genre) => {
      data.push(genre._id)
    })
    return res.status(200).json({ status: 200, body: data });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get Book per genre
GetBookRouter.get("/book/get-all-book-per-genre", async (req, res) => {
  const cache = {}
  try {
    const search = req.query.genre || "";

    if (cache[search]) {
      return res.json(cache[search])
    };

    await BookModel.find({ genre: search, status: "Available" })
      .then((data) => {
        cache[search] = data;
        return res.json(data);
      })

    // const books = await BookModel.find({ genre: { $regex: search, $options: "i" } });
    // console.log(books)
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

module.exports = GetBookRouter;
