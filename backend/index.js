require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./Configs/database");
const { userRouter } = require("./Routes/user.routes");
const { eventRouter } = require("./Routes/event.routes");
const { requestRouter } = require("./Routes/request.routes");
const { authorizeUser } = require("./Middleware/user.middleware");

const app = express();

/**
 * * Middlewares
 */

app.use(express.json()); //inbuilt middleware

//* adding cors
app.use(cors());

/**
 * * Routes
 */
app.use("/api", userRouter);
app.use("/api", eventRouter);

// *adding authorize middleware

app.use(authorizeUser);

app.use("/api", requestRouter);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello" });
});

//* listening Server and Connecting Database

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
