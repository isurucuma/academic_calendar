const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

const Event = new mongoose.model(
  "events",
  new mongoose.Schema({
    title: {
      type: String,
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
  })
);

/* POST event. */
router.post("/create", async (req, res, next) => {
  let event = new Event({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    batch: req.body.batch,
  });
  event = await Event.create(event);
  res.send(event).status(200);
});

/* GET events listing. */
router.get("/", async (req, res, next) => {
  const events = await Event.find();
  res.send(events);
});

/* update event listing. */
router.put("/update/:id", async (req, res, next) => {
  let currEvent = await Event.findById(req.params.id);
  console.log(currEvent);
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(event).status(200);
});

/* delete event listing. */
router.delete("/update/:id", async (req, res, next) => {
  const event = await Event.findByIdAndRemove(req.params.id);

  res.send(event).status(200);
});

module.exports = router;
