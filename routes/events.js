var express = require("express");
var router = express.Router();
const Event = require("../Database/Models/events");
const EventCategory = require("../Database/Models/eventCategory");

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
    let response = await Event.find();
    const data = await Promise.all(
      response.map(async (item) => {
        const data = await EventCategory.findById(item.title);
        return { ...item, data };
      })
    );

    const event = data.map((item) => {
      let event = item._doc;
      event.eventTitle = item.data.name;
      return { event };
    });

    res.send(event).status(200);
  } catch (error) {
    res.send(error.message).status(400);
  }
});

/* update event listing. */
router.put("/update/:id", async (req, res, next) => {
  try {
    const entry = await Event.findById(req.params.id);

    if (!entry) {
      res.send("Event doesn't exist").status(400);
    } else {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send(event).status(200);
    }
  } catch (error) {
    res.send(error.message).status(400);
  }
});

/* delete event listing. */
router.delete("/update/:id", async (req, res, next) => {
  try {
    const entry = await Event.findById(req.params.id);

    if (!entry) {
      res.send("Event doesn't exist").status(400);
    } else {
      const event = await Event.findByIdAndRemove(req.params.id);
      res.send(event).status(200);
    }
  } catch (error) {
    res.send(error.message).status(400);
  }
});

module.exports = router;
