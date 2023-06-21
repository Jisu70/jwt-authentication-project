// Dependencies
const express = require("express");

const app = express();

const router = require("./routhandler/main.route");

// Requring datbase connection
const database = require("./util/db.connection.js");

// To parse the json data
app.use(express.json());

// Call the dtabase to connect
database();

app.use(router);

app.listen(3000, () => {
  console.log(" app listen on port 3000");
});
