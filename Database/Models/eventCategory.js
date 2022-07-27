const mongoose = require("mongoose");
const connection = require("./../connection");

const eventCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const EventCategory = connection.model("event_category", eventCategory);
module.exports = EventCategory;
