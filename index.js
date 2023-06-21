const express = require('express');

const app = express();

const router = require('./routhandler/main.route');

const database = require('./util/db.connection.js');

database();

app.use(router);

app.listen(3000, () => {
  console.log(' app listen on port 3000');
});
