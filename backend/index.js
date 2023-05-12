require("dotenv").config();
const express = require("express");
const { dbConnection } = require("./Configs/database");

const app = express();

/**
 * * Middlewares
 */

app.use(express.json()); //inbuilt middleware

/**
 * * Routes
 */

app.get("/", (req, res) => {
  res.status.send({ msg: "Hello" });
});

// listening Server and Connecting Database

(async () => {
  try {
    //* database Connected
    await dbConnection;
    console.log("Database Connected");

    // *Server Connection
    app.listen(process.env.PORT, () => {
      console.log("Server Connected");
    });
  } catch (err) {
    //! Database Error
    console.log("err:", err);
  }
})();
