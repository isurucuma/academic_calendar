// connect to the database
require("dotenv").config();
const mongoose = require("mongoose");

const connection = mongoose.createConnection(process.env.URL);

module.exports = connection;
