require("dotenv").config();
const mongoose = require("mongoose");

export const dbConnection = await mongoose.connection(
  `${process.env.MONGODB_URL}`
);
