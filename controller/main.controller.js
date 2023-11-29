const User = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * 
 * @param {*} req This api is used to find all the user 
 * @param {*} res 
 */
const mainRoute = async (req, res) => {
  try {
    const user = await User.find({});
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500).json({
      error: "There ws a problem in sever side",
    });
  }
};

/**
 * 
 * @param {*} req This api is used to save the user 
 * @param {*} res 
 */
const saveData = async (req, res) => {
  console.log("Resquest Received ");
  try {
    //  To hash  the password we used bcrypt
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
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
  console.log("Request received from Login user");
  try {
    // This will search the user using username
    const user = await User.find({
      username: req.body.username,
    });
    console.log(user);
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
        console.log(token);
        res.cookie("jwtToken", token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({
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

const retrieveToken = (req, res) => {
  const token = req.cookies.jwtToken; // Retrieving the token from the cookie
  if (token) {
    // You can use the token for further operations (e.g., authentication)
    // For example, verifying the token:
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Token verification failed
        res.status(401).json({ error: "Token verification failed" });
      } else {
        // Token is valid, do something with decoded data (e.g., user information)
        const { username, userId } = decoded;
        res.status(200).json({ username, userId });
      }
    });
  } else {
    res.status(401).json({ error: "Token not found" });
  }
};


module.exports = {
  mainRoute,
  saveData,
  loginUser,
  retrieveToken
};


