const express = require("express");
const multer = require("multer");
const AddBookRouter = new express.Router();
const QRCode = require("qrcode");
const BookModel = require("../../models/bookModel");
const csvToJSON = require("csvtojson");
const path = require("path");
const PromisePool = require("@supercharge/promise-pool");

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only image is allowed"));
  }
};

const fileConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const isCsv = (req, file, callback) => {
  if (file.mimetype.startsWith("text")) {
    callback(null, true);
  } else {
    callback(new Error("Only image is allowed"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

const uploadFile = multer({
  storage: fileConfig,
  fileFilter: isCsv,
});

const parseFile = (file) => {
  const fileDetails = csvToJSON({
    noheader: false,
    headers: [
      "Title",
      "Author",
      "ISBN",
      "Quantity",
      "Genre",
      "Location",
      "Publication",
      "Description",
      "Abstract",
      "Notes",
      "Assession",
      "Building",
      "Penalty",
    ],
  }).fromFile(path.resolve(__dirname, `../../uploads/${file}`));
  return fileDetails;
};

AddBookRouter.post(
  "/book/single-add",
  upload.single("photo"),
  async (req, res) => {
    const { filename } = req.file;
    const {
      title,
      author,
      isbn,
      quantity,
      location,
      publication,
      abstract,
      genre,
      notes,
      desc,
      assession,
      building,
      penalty,
    } = req.body;

    try {
      // validate if book isbn is exist
      const validate = await BookModel.findOne({ isbn: isbn });
      if (validate) {
        return res.status(422).json({ error: "ISBN is already exists" });
      }
      const qrCode = await QRCode.toDataURL(isbn);
      const capGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
      const finalRecord = new BookModel({
        title,
        author,
        isbn,
        qty: quantity,
        location,
        publication,
        desc,
        abstract,
        genre: capGenre,
        notes,
        assession,
        status: "Available",
        imgpath: filename,
        QRCode: qrCode,
        bookRatingsCount: 0,
        totalRatings: 0,
        created: new Date().toISOString(),
        lostPenalty: penalty,
        bldgStock: building,
      });

      const storeRecord = await finalRecord.save();

      return res.status(201).json({ status: 201, body: storeRecord });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ status: 422, error: error });
    }
  }
);

AddBookRouter.post(
  "/book/batch-add",
  uploadFile.single("file"),
  async (req, res) => {
    const { filename } = req.file;
    const details = await parseFile(filename);

    await PromisePool.for(details)
      .withConcurrency(300)
      .process(
        async ({
          Title,
          Author,
          ISBN,
          Quantity,
          Genre,
          Location,
          Publication,
          Description,
          Abstract,
          Notes,
          Assession,
          Building,
          Penalty,
        }) => {
          try {
            const validate = await BookModel.findOne({ isbn: ISBN });
            if (validate) {
              return;
            }
            const qrCode = await QRCode.toDataURL(ISBN);

            const finalRecord = new BookModel({
              title: Title,
              author: Author,
              qty: Quantity,
              isbn: ISBN,
              genre: Genre,
              location: Location,
              publication: Publication,
              abstract: Abstract,
              notes: Notes,
              assession: Assession,
              desc: Description,
              status: "Review",
              bookRatingsCount: 0,
              totalRatings: 0,
              QRCode: qrCode,
              created: new Date().toISOString(),
              lostPenalty: Penalty,
              bldgStock: Building,
            });
            await finalRecord.save();
          } catch (error) {
            console.log(error);
            return res.status(422).json(error);
          }
        }
      );
    return res
      .status(201)
      .json({ status: 201, message: "Batch Adding Completed" });
  }
);

AddBookRouter.patch("/book-delete-available/:_id", async (req, res) => {
  try {
    const id = req.params._id;

    const getBookToDelete = await BookModel.findOne({
      _id: id,
    });
    if (!getBookToDelete) {
      return res
        .status(404)
        .json({ error: "Something went wrong. Please try again later" });
    }
    await getBookToDelete.updateOne({
      isbn: `deleted_${new Date().getTime()}_${getBookToDelete.isbn}`,
      status: "Deleted",
    });
    return res.status(201).json({ status: 201, body: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

AddBookRouter.patch(
  "/book-update-review/:_id",
  upload.single("photo"),
  async (req, res) => {
    try {
      const { filename } = req.file;
      const id = req.params._id;

      const getBookReviewToUpdate = await BookModel.findOne({
        _id: id,
        status: "Review",
      });

      if (!getBookReviewToUpdate) {
        return res
          .status(404)
          .json({ error: "Something went wrong. Please try again later" });
      }

      if (filename) {
        getBookReviewToUpdate.imgpath = filename;
        getBookReviewToUpdate.status = "Available";
      }

      const updatedData = await getBookReviewToUpdate.save();

      return res.status(201).json({ status: 201, updatedData });
    } catch (error) {
      console.log(error);
      return res.status(404).json(error);
    }
  }
);

AddBookRouter.patch("/book-update-available/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const {
      title,
      author,
      isbn,
      location,
      publication,
      bldgStock,
      quantity,
      lostPenalty,
      abstract,
      genre,
      notes,
      desc,
      assession,
    } = req.body;

    const getBookToUpdate = await BookModel.findOne({
      _id: id,
    });

    if (!getBookToUpdate) {
      return res
        .status(404)
        .json({ error: "Something went wrong. Please try again later" });
    }

    const qrCode = await QRCode.toDataURL(isbn);

    // if (filename) getBookToUpdate.imgpath = filename;
    if (title) getBookToUpdate.title = title;
    if (author) getBookToUpdate.author = author;
    if (isbn) {
      getBookToUpdate.isbn = isbn;
      getBookToUpdate.QRCode = qrCode;
    }
    if (location) getBookToUpdate.location = location;
    if (publication) getBookToUpdate.publication = publication;
    if (bldgStock) getBookToUpdate.bldgStock = bldgStock;
    if (quantity) getBookToUpdate.qty = quantity;
    if (lostPenalty) getBookToUpdate.lostPenalty = lostPenalty;
    if (abstract) getBookToUpdate.abstract = abstract;
    if (genre) getBookToUpdate.genre = genre;
    if (notes) getBookToUpdate.notes = notes;
    if (desc) getBookToUpdate.desc = desc;
    if (assession) getBookToUpdate.assession = assession;

    const updatedData = await getBookToUpdate.save();

    return res.status(201).json({ status: 201, updatedData });
  } catch (error) {
    return res.status(404).json(error);
  }
});

module.exports = AddBookRouter;
