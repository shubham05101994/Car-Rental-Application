var express = require("express");
var cors = require("cors");
var path = require("path");
//var bodyParser = require('body-parser') 
var app = express();
var port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: false
  })
);

var Users = require("./routes/Users");
var DriversPage = require("./routes/DriversPageApi");
var AdminPage = require("./routes/AdminPageApi");
app.use("/users", Users);
app.use("/driverspage", DriversPage);
app.use("/adminpageapi", AdminPage);
app.listen(port, function() {
  console.log("Server is running on port: " + port);
});
module.exports = app;