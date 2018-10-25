// var express = require("express");
// Dependencies
var friends = require("../data/friends.js");

module.exports = function(app) {
    
// Displays all friends
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

// Gets the new friend data, call the findFriend fucntion, and sends back the best match
app.post("/api/friends", function(req, res) {
    var index = findFriend(req.body);
    return res.json(friends[index]);
});}

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