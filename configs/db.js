const mongoose = require("mongoose");
require("dotenv").config();

const connectedToDb = mongoose.connect(process.env.mongourl);

module.exports = connectedToDb;