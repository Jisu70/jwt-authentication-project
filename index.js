// Dependencies
const express = require("express");

const app = express();
var cookieParser = require('cookie-parser') 

app.use(cookieParser());
require("dotenv").config();

const router = require("./routes/main.route.js");

// To parse the json data
app.use(express.json());

// Requring datbase connection
const database = require("./util/db.connection.js");

app.use(express.static("views"));



// Call the dtabase to connect
database();

app.use("/api", router);


// Default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ err: err });
};
app.use(errorHandler);

app.listen(3000, () => {
  console.log("App was listening on port 3000")
}
)
