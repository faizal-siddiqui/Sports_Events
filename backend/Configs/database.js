require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = mongoose.connect(`${process.env.MONGODB_URL}`);

module.exports = { dbConnection };
