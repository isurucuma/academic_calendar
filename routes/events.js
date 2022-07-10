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
  try {
    let event = new Event({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      batch: req.body.batch,
    });
    event = await Event.create(event);
    res.send(event).status(200);
  } catch (error) {
    res.send(error.message).status(400);
  }
});

/* GET events listing. */
router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.send(error.message).status(400);
  }
});

/* update event listing. */
router.put("/update/:id", async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.send(event).status(200);
  } catch (error) {
    res.send(error.message).status(400);
  }
});

/* delete event listing. */
router.delete("/update/:id", async (req, res, next) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.id);
    res.send(event).status(200);
  } catch (error) {
    res.send(error.message).status(400);
  }
});

module.exports = router;
