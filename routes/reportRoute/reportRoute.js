const express = require("express");
const AddReportRouter = new express.Router();
const PromisePool = require("@supercharge/promise-pool");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const BookModel = require("../../models/bookModel");
const ReserveBookModel = require("../../models/reserveBookModel.js");
const BorrowBookModel = require("../../models/borrowBookModel");
const StudentModel = require("../../models/studentModel");
const ReportModel = require("../../models/reportsModel");
const path = require('path');

AddReportRouter.post("/report/generate", async (req, res) => {
  const { report, start, end } = req.body;
  let fileName = `${report}-${new Date().getTime()}-generated-report.csv`
  let pathFile = path.resolve(__dirname, '../../file-uploads')
  const startDate = new Date(start);
  const endDate = new Date(end);
  let dataReport;
  let csvWriter;

  switch (report) {
    case "studentAccounts":
      dataReport = await StudentModel.find({
        created: {
          $gt: startDate,
          $lt: endDate,
        },
      });

      csvWriter = createCsvWriter({
        header: [
          { id: "studentId", title: "Student ID" },
          { id: "firstName", title: "First Name" },
          { id: "middleName", title: "Middle Name" },
          { id: "lastName", title: "Last Name" },
          { id: "address", title: "Address" },
          { id: "grade", title: "Grade" },
          { id: "section", title: "Section" },
          { id: "gender", title: "Gender" },
          { id: "email", title: "Email" },
          { id: "created", title: "Created" },
        ],
        path: `${pathFile}/${fileName}`,
      });
      break;
    case "borrowedBooks":
      dataReport = await BorrowBookModel.find({
        dateBorrowed: {
          $gt: startDate,
          $lt: endDate,
        },
        status: "Borrowed",
      });

      csvWriter = createCsvWriter({
        header: [
          { id: "studentId", title: "Student ID" },
          { id: "firstName", title: "First Name" },
          { id: "middleName", title: "Middle Name" },
          { id: "lastName", title: "Last Name" },
          { id: "grade", title: "Grade" },
          { id: "section", title: "Section" },
          { id: "email", title: "Email" },
          { id: "title", title: "Book Title" },
          { id: "isbn", title: "ISBN" },
          { id: "author", title: "Author Name" },
          { id: "assession", title: "Accession Number" },
          { id: "publication", title: "Grade" },
          { id: "status", title: "Status" },
        ],
        path: `${pathFile}/${fileName}`,
      });
      break;
    case "returnedBooks":
      dataReport = await BorrowBookModel.find({
        dateBorrowed: {
          $gt: startDate,
          $lt: endDate,
        },
        status: "Returned",
      });
      break;
    case "lostBooks":
      dataReport = await BorrowBookModel.find({
        dateBorrowed: {
          $gt: startDate,
          $lt: endDate,
        },
        status: "Lost",
      });
      break;
    case "reservedBooks":
      dataReport = await ReserveBookModel.find({
        dateReserved: {
          $gt: startDate,
          $lt: endDate,
        },
        status: "Reserved",
      });
      break;
    case "newBooks":
      dataReport = await BookModel.find({
        dateReserved: {
          $gt: startDate,
          $lt: endDate,
        },
        status: "Reserved",
      });
      break;
  }
  const { results } = await PromisePool.for(dataReport)
    .withConcurrency(300)
    .process(
      ((details) => {
        switch (report) {
          case "studentAccounts":
            return {
              studentId: details.studentId,
              firstName: details.firstName,
              middleName: details.middleName,
              lastName: details.lastName,
              address: details.address,
              grade: details.grade,
              section: details.section,
              gender: details.gender,
              email: details.email,
              created: new Date(details.created),
            }
          case "borrowedBooks":
            return {
              studentId: details.studentId,
              firstName: details.firstName,
              middleName: details.middleName,
              lastName: details.lastName,
              grade: details.grade,
              section: details.section,
              email: details.email,
              title: details.title,
              isbn: details.firstName,
              author: details.author,
              assession: details.assession,
              publication: details.publication,
              status: details.status,
            }
          case "returnedBooks":
            break;
          case "lostBooks":
            break;
          case "reservedBooks":
            break;
          case "newBooks":
            break;
        }
      })
    );
  await csvWriter.writeRecords(results);
  try {
    const finalRecord = new ReportModel({
      filePath: fileName,
      created: new Date().toISOString(),
    });
    const storeData = await finalRecord.save();
    return res.status(201).json({ status: 201, body: storeData });
  } catch (error) {
    return res.status(422).json(error);
  }
});

AddReportRouter.get("/report/get-generated", async (req, res) => {
  try {
    const generatedReport = await ReportModel.find().sort({ created: -1 });
    return res.status(200).json({ status: 200, body: generatedReport });
  } catch (error) {
    return res.status(422).json(error);
  }
})

AddReportRouter.get("/report/download-csv", async (req, res) => {
  const file = req.query.filename || "";
  const pathFile = path.join(__dirname, `../../file-uploads/${file}`);

  res.download(pathFile, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occured" });
    }
  })
});

module.exports = AddReportRouter;

