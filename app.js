const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const index = require("./index.js");


const app = express();

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.set("view engine", "ejs");

const port = 1338;
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/market";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("market");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection customers created!");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("market");
  var myobj = { type: "All",
  saabInStock: 20,
  volvoInStock: 20,
  fordInStock: 20,
  fiatInStock: 20, };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);

const server = app.listen(port, () => console.log('Api listening on port ' + port));

module.exports = server;
