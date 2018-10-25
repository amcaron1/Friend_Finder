var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var home = app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});
  
var survey = app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});
  
module.exports = {home,survey};