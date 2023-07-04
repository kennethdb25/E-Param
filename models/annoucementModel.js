const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  announcementId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const AnnouncementModel = new mongoose.model(
  "announcementeInfo",
  AnnouncementSchema
);

module.exports = AnnouncementModel;
