require("dotenv").config();
const express = require("express");
const { dbConnection } = require("./Configs/database");
const { userRouter } = require("./Routes/user.routes");

const app = express();

/**
 * * Middlewares
 */

app.use(express.json()); //inbuilt middleware

/**
 * * Routes
 */
app.use("/api", userRouter);
// app.use("/api/events", );

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello" });
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
