const mongoose = require("mongoose");

const GradeSectionSchema = new mongoose.Schema({
  sectionId: {
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
  status: {
    type: String,
    required: true,
  },
});

const GradeSectionModel = new mongoose.model(
  "gradeSectionInfo",
  GradeSectionSchema
);

module.exports = GradeSectionModel;
