const express = require("express");

const app = express();

app.get("/", function(req, res) {
  res.send("<h1>Hello World</h1>");
});

app.get("/contact", function(req, res) {
  res.send("contact zone O_O");
});

app.get("/about", function(req, res) {
  res.send("im gabe i really really really like to slack off and do nothing with my life all the time");
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
