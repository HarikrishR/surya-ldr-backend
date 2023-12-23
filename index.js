const express = require('express');
const app = express();
const cors = require("cors");
const port = 8000;
const bodyParser = require("body-parser");
const db = require("./database/index");

const middlewares = [
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  }),
  bodyParser.json({
    limit: "50mb",
  }),
];
app.use(middlewares);
db.connect();

// enable cors
app.use(
  cors({
    origin: "*", // constant.host, //Website you wish to allow to connect
    methods: "GET,PUT,POST,DELETE", // Request methods you wish to allow
  })
);
app.options("*", cors());

var routes = require("./config/routes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});