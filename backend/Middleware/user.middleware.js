require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Model/user.model");

// * for checking the user already Exist with that username while register
const userAlreadyExist = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // * Check the username
    const user = await UserModel.findOne({ username });

    //* if User exist
    if (user) {
      res.status(403).json({ msg: "User with this username already exist" });
    } else {
      //* move forward
      next();
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * Hash Password

const hashPassword = (req, res, next) => {
  const { password } = req.body;

  // * Hash Password

  const saltRounds = +process.env.SALT_ROUND;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    // Storing hash in password DB.

    if (err) {
      res.status(500).json({ err: "Server Error" });
    } else {
      //* storing hash Password into the password key of body

      req.body.password = hash;

      //* move forward

      next();
    }
  });
};

// * for authenticating user
const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // * Check the username
    const user = await UserModel.findOne({ username });

    //* if User exist
    if (user) {
      const hashPassword = user.password;

      //   * Check the Password also

      bcrypt.compare(password, hashPassword, (err, result) => {
        // * if password matched

        if (result) {
          //* storing user_id of user in body to pass it into token

          req.body.user_id = user._id;

          //* move forward
          next();
        } else {
          res.status(401).json({ msg: "❌ Wrong Password" });
        }
      });
    } else {
      res.status(401).json({ msg: "Wrong Credentials" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * for authorizing user
const authorizeUser = async (req, res, next) => {
  let token = req.headers.authorization;

  //   * if token exists

  if (token) {
    // * take out tk=oken by split
    token = token.split(" ")[1];

    // * verify Token

    const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);

    //* if the token verifies

    if (decoded.user_id) {
      // * store user_id into body

      req.body.user_id = decoded.user_id;

      // move forward

      next();
    } else {
      //! otherwise Token Expired

      res.status(401).json({ msg: "Token Expired" });
    }
  } else {
    res.status(500).json({ err: "Token Missing" });
  }
};

module.exports = {
  userAlreadyExist,
  authenticateUser,
  authorizeUser,
  hashPassword,
};
