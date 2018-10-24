// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User Data
// =============================================================
var friends = [
  {
    name: "Yoda",
    photo: "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125",
    scores: [1,2,3,4,5,4,3,2,1,2]
  },
  {
    name: "Darth Maul",
    photo: "https://vignette.wikia.nocookie.net/starwars/images/7/79/Maul_SASWS_Forbes_Promo_HS.png/revision/latest?cb=20180909043811",
    scores: [3,4,5,4,3,2,1,2,3,4]
  },
  {
    name: "Obi Wan Kenobi",
    photo: "https://vignette.wikia.nocookie.net/starwars/images/4/4e/ObiWanHS-SWE.jpg/revision/latest?cb=20111115052816",
    scores: [5,4,3,2,1,2,3,4,5,4]
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// Displays all friends
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

// 
app.post("/api/friends", function(req, res) {
    console.log("hello");
    console.log(req.body);

    return res.json(friends[0]);
    
    
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
