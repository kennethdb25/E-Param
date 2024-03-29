const express = require('express');
const GetBookRouter = new express.Router();
const BookModel = require('../../models/bookModel');
const ReserveBookModel = require('../../models/reserveBookModel.js');
const BorrowBookModel = require('../../models/borrowBookModel');

// get new books
GetBookRouter.get('/book/get-new', async (req, res) => {
  try {
    const newBooks = await BookModel.find({ status: 'Available' }).sort({ created: -1 }).limit(10);
    return res.status(200).json({ status: 200, body: newBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// Get all available books
GetBookRouter.get('/book/get-available', async (req, res) => {
  try {
    const newBooks = await BookModel.find({ status: 'Available' });
    return res.status(200).json({ status: 200, body: newBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

GetBookRouter.get('/book/get-all-review', async (req, res) => {
  try {
    const reviewBooks = await BookModel.find({ status: 'Review' });
    return res.status(200).json({ status: 200, body: reviewBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// Get all reserve books
GetBookRouter.get('/book/get-reserved', async (req, res) => {
  try {
    const borrowedBooks = await ReserveBookModel.find({ status: 'Reserved' });
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get all borrowed books for admin and librarian
GetBookRouter.get('/book/get-borrowed', async (req, res) => {
  try {
    const borrowedBooks = await BorrowBookModel.find().sort({
      dateBorrowed: -1,
    });
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get borrowed books per student
GetBookRouter.get('/book/student-borrowed', async (req, res) => {
  const all = req.query.email || '';
  try {
    const borrowedBooks = await BorrowBookModel.find({ email: all });
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

GetBookRouter.get('/book/get-all-lost', async (req, res) => {
  try {
    const lostBooks = await BorrowBookModel.find({ status: 'Lost' }).sort({
      dateLost: -1,
    });
    return res.status(200).json({ status: 200, body: lostBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get borrowed books per student
GetBookRouter.get('/book/get-lost', async (req, res) => {
  const all = req.query.email || '';
  try {
    const lostBooks = await BorrowBookModel.find({
      email: all,
      status: 'Lost',
    });
    return res.status(200).json({ status: 200, body: lostBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get all currently borrowed books per student
GetBookRouter.get('/book/student-currently-borrowed', async (req, res) => {
  const all = req.query.email || '';
  try {
    const borrowedBooks = await BorrowBookModel.find({
      email: all,
      status: 'Borrowed',
    });
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get all currently borrowed books for student
GetBookRouter.get('/book/all-currently-borrowed', async (req, res) => {
  try {
    const currentlyBorrowedBooks = await BorrowBookModel.find({
      status: 'Borrowed',
    });
    return res.status(200).json({ status: 200, body: currentlyBorrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get reserved books per student
GetBookRouter.get('/book/student-shelf', async (req, res) => {
  const all = req.query.email || '';
  try {
    const borrowedBooks = await ReserveBookModel.find({
      email: all,
      status: 'Reserved',
    });
    return res.status(200).json({ status: 200, body: borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});
// get availble books per genre
GetBookRouter.get('/book/get-genre', async (req, res) => {
  try {
    let data = [];
    const getGenre = await BookModel.aggregate([
      // {
      //   $match: {
      //     status: 'Available',
      //   },
      // },
      {
        $group: {
          _id: '$genre',
          uniqueValues: {
            $addToSet: '$genre',
          },
        },
      },
    ]);
    getGenre.map((genre) => {
      data.push(genre._id);
    });
    return res.status(200).json({ status: 200, body: data });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

// get Book per genre
GetBookRouter.get('/book/get-all-book-per-genre', async (req, res) => {
  const cache = {};
  try {
    const search = req.query.genre || '';

    if (cache[search]) {
      return res.json(cache[search]);
    }
    // try to remove status available
    await BookModel.find({ genre: search, status: { $in: ['Reserved', 'Available'] } }).then((data) => {
      cache[search] = data;
      return res.json(data);
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

//GET BOOK INFO FOR PROCESSING RESERVED BOOK
GetBookRouter.get('/book/get-info', async (req, res) => {
  const info = req.query.isbn || '';
  try {
    const getBookInfo = await BookModel.findOne({ isbn: info });
    return res.status(200).json({ status: 200, body: getBookInfo });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

GetBookRouter.get('/book-graph-ratings', async (req, res) => {
  try {
    const ratings = await BookModel.aggregate([
      {
        $match: {
          status: {
            $ne: 'Deleted',
          },
          ratings: {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: '$title',
          ratings: {
            $addToSet: '$ratings',
          },
        },
      },
      {
        $sort: {
          ratings: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    return res.status(200).json({
      status: 200,
      body: ratings,
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

GetBookRouter.get('/book-borrowed-ratings', async (req, res) => {
  try {
    const ratings = await BorrowBookModel.aggregate([
      {
        $match: {
          status: {
            $ne: 'Lost',
          },
          grade: {
            $ne: 'N/A',
          },
        },
      },
      {
        $group: {
          _id: '$grade',
          gradeNumber: {
            $addToSet: '$_id',
          },
        },
      },
      {
        $sort: {
          grade: -1,
        },
      },
    ]);
    return res.status(200).json({
      status: 200,
      body: ratings,
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

GetBookRouter.get('/book/borrowed/push-notification', async (req, res) => {
  const today = new Date();
  const startPoint = today.getDay() !== 5 ? 1 : 3;
  let initialDate = new Date(today);
  initialDate.setDate(today.getDate() + startPoint);

  const startDate = new Date(initialDate.toISOString().split('T')[0] + 'T00:00:00.000Z');
  const endDate = new Date(initialDate.toISOString().split('T')[0] + 'T23:59:59.999Z');

  try {
    const users = await BorrowBookModel.find({
      returnDate: { $gte: startDate, $lte: endDate },
      status: 'Borrowed',
      grade: { $ne: 'N/A' },
    });
    return res.status(200).json({
      status: 200,
      body: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

GetBookRouter.delete('/book/reserved/delete', async (req, res) => {
  const id = req.query._id || '';
  const isbn = req.query.isbn || '';

  try {
    const checkBook = await ReserveBookModel.findOne({
      _id: id,
      status: 'Reserved',
    });

    const toChangeStatus = await BookModel.findOne({ isbn: isbn });

    if (!checkBook || !toChangeStatus) {
      return res.status(404).json({ error: 'Book Not Found' });
    }
    const deleteBook = await ReserveBookModel.deleteOne({
      _id: id,
      status: 'Reserved',
    });

    if (toChangeStatus.qty === 0) {
      if (toChangeStatus) {
        toChangeStatus.status = 'Available';
        toChangeStatus.qty = toChangeStatus.qty + 1;

        const proccessBook = await toChangeStatus.save();

        return res.status(200).json({ status: 200, body: { deleteBook, proccessBook } });
      } else {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      if (toChangeStatus) {
        toChangeStatus.qty = toChangeStatus.qty + 1;

        const proccessBook = await toChangeStatus.save();

        return res.status(200).json({ status: 200, body: { deleteBook, proccessBook } });
      } else {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

GetBookRouter.get('/book/student-borrow-history', async (req, res) => {
  const studentId = req.query.studentId || '';
  try {
    const bookHistory = await BorrowBookModel.find({ studentId }).sort({ dateBorrowed: -1 });
    return res.status(200).json({ status: 200, body: bookHistory });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

module.exports = GetBookRouter;
