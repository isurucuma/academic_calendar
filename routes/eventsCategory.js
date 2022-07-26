var express = require("express");
var router = express.Router();
const EventCategory = require("../Database/Models/eventCategory");

/* POST event category. */
router.post("/addEventCategory", async (req, res, next) => {
  try {
    eventCategory = await EventCategory.insertMany([
      {
        name: "Dead week",
      },
      {
        name: "'Examination'",
      },
      {
        name: "Vacation",
      },
      {
        name: "Industrial training special 1",
      },
      {
        name: "Industrial training special 2",
      },
      {
        name: "Final exam ending week",
      },
      {
        name: "Survey camp",
      },
      {
        name: "Soft skill development program",
      },
      {
        name: "General elective special",
      },
      {
        name: "Online classes",
      },
    ]);
    res.send(200);
  } catch (error) {
    res.send(error.message).status(400);
  }
});

/* GET events listing. */
router.get("/", async (req, res, next) => {
  try {
    let response = await EventCategory.find();

    res.send(response).status(200);
  } catch (error) {
    res.send(error.message).status(400);
  }
});

module.exports = router;
