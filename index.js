// Dependencies
const express = require("express");

const app = express();

const dotenv = require('dotenv')

dotenv.config()

const router = require("./routhandler/main.route");

// Requring datbase connection
const database = require("./util/db.connection.js");

// To parse the json data
app.use(express.json());

// Call the dtabase to connect
database();

app.use(router);

// Default error handler
const  errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ err: err });
}
app.use(errorHandler)

app.listen(3000, () => {
  console.log(" app listen on port 3000");
});
