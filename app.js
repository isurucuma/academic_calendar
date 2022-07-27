const mongoose = require("mongoose");
require("dotenv").config();

var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

<<<<<<< HEAD
// connect to the database
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const eventsRouter = require("./routes/events");
const notificationsRouter = require("./routes/notifications");

mongoose
    .connect(process.env.URL)
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));
=======
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eventsRouter = require("./routes/events");
var eventsCategoryRouter = require("./routes/eventsCategory");
>>>>>>> 0036b1ac1506ed9806ba93a3fa9acee82909e826

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

<<<<<<< HEAD
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/notifications", notificationsRouter);
=======
app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/eventsCategory", eventsCategoryRouter);
>>>>>>> 0036b1ac1506ed9806ba93a3fa9acee82909e826

module.exports = app;
