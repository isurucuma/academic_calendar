const mongoose = require("mongoose");
require("dotenv").config();

var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eventsRouter = require("./routes/events");
var eventsCategoryRouter = require("./routes/eventsCategory");
const notificationsRouter = require("./routes/notifications");

var app = express();
app.use(cors());

mongoose
  .connect(process.env.URL)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/eventsCategory", eventsCategoryRouter);
app.use("/api/notifications", notificationsRouter);

module.exports = app;
