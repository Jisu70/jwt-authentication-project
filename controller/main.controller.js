const User = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const mainRoute = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user)
  } catch (error) {
    res.status(500).json({
      error: "There ws a problem in sever side",
    });
  }
};
const saveData = async (req, res) => {
  try {
    //  To hash  the password we used bcrypt
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup  was Successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
const loginUser = async (req, res) => {
  try {
    // This will search the user using username
    const user = await User.find({
      username: req.body.username,
    });
    if (user && user.length > 0) {
      // This will compare the password thats come with body
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        // Generating token using jwt
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          access_token: token,
          message: "Signup  was Successfully!",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed !",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication was failed !!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: "Authentication was failed !!!",
    });
  }
};

module.exports = {
  mainRoute,
  saveData,
  loginUser,
};
