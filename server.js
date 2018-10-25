// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

// html routes
var home = require("./app/routing/htmlRoutes.js");
var survey = require("./app/routing/htmlRoutes.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Friend data
var friends = [];

// Get the friend data and put it in friends
fs.readFile("./app/data/friends.js", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    friends = JSON.parse(data);
})

// Routes
// =============================================================

// Basic route that sends the user to the home page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

// Survey route that sends the user to the survey page
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// Displays all friends
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

// Gets the new friend data, call the findFriend fucntion, and sends back the best match
app.post("/api/friends", function(req, res) {
    var index = findFriend(req.body);
    return res.json(friends[index]);
});

// Searches the friends array for the best match
function findFriend(newFriend) {
    var score = 0;
    var lowScore = 100;
    var lowIndex = 0;
    for (var i = 0; i < friends.length; i++) {
        for (var j = 0; j < 10; j++) {
            score = score + Math.abs(newFriend.scores[j] - friends[i].scores[j]);
        }
        if (score < lowScore) {
            lowScore = score;
            lowIndex = i;
        }
        score = 0;
    }
    return lowIndex;
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
