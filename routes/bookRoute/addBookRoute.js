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
      "Genre",
      "Location",
      "Publication",
      "Description",
      "Abstract",
      "Notes",
      "Assession"
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
      location,
      publication,
      abstract,
      genre,
      notes,
      desc,
      assession
    } = req.body;

    // validate if book isbn is exist
    const validate = await BookModel.findOne({ isbn: isbn });
    if (validate) {
      return res.status(422).json({ error: "ISBN is already exists" });
    }
    try {
      const qrCode = await QRCode.toDataURL(isbn);

      const finalRecord = new BookModel({
        title,
        author,
        isbn,
        location,
        publication,
        desc,
        abstract,
        genre,
        notes,
        assession,
        status: "Available",
        imgpath: filename,
        QRCode: qrCode,
        created: new Date().toISOString(),
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
          Genre,
          Location,
          Publication,
          Description,
          Abstract,
          Notes,
          Assession
        }) => {
          const validate = await BookModel.findOne({ isbn: ISBN });
          if (validate) {
            return;
          }
          try {
            const qrCode = await QRCode.toDataURL(ISBN);

            const finalRecord = new BookModel({
              title: Title,
              author: Author,
              isbn: ISBN,
              genre: Genre,
              location: Location,
              publication: Publication,
              abstract: Abstract,
              notes: Notes,
              assession: Assession,
              desc: Description,
              status: "Review",
              QRCode: qrCode,
              created: new Date().toISOString(),
            });
            await finalRecord.save();
          } catch (error) {
            console.log(error);
            return res.status(422).json(error);
          }
        }
      );
    return res.status(201).json({ status: 201, message: "Batch Adding Completed" });
  }
);

module.exports = AddBookRouter;
