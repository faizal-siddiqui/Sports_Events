const registerUser = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    //* creating user Object

    const user = new UserModel({
      name,
      username,
      password,
    });

    //* Save user into database

    await user.save();

    res.status(200).json({ msg: "Signup Successful" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const loginUser = async (req, res) => {
  const { user_id } = req.body; //* passed by middleware

  try {
    // * Creating Token from jwt

    const token = jwt.sign(
      {
        user_id,
      },
      `${process.env.TOKEN_SECRET}`,
      { expiresIn: "24h" }
    );

    res.status(200).json({ msg: "login Successful", token });
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
