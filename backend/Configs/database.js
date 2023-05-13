require("dotenv").config();
const mongoose = require("mongoose");

// * Creating Connection with database
const dbConnection = mongoose.connect(`${process.env.MONGODB_URL}`);

module.exports = { dbConnection };
