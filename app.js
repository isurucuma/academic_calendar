require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

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

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/notifications", notificationsRouter);

module.exports = app;
