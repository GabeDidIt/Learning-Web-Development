const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

client.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER,
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  const run = async () => {
    try {
      const response = await client.lists.addListMember("dd8e819da2", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      console.log("====== ERROR ======");
      console.log(JSON.parse(err.response.error.text).detail);
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
