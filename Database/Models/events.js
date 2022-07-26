const mongoose = require("mongoose");
const connection = require("./../connection");
const EventCategory = require("./eventCategory");

const event = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: EventCategory,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },
});

const Event = connection.model("Event", event);
module.exports = Event;
