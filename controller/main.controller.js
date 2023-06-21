const mongoose = require('mongoose');
const User = require('../schema/user.schema');
const bcrypt = require('bcrypt');

const mainRoute = (req, res) => {
  res.send('hello world');
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
      message: 'Signup  was Successfully!',
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  mainRoute,
  saveData,
};
