//require installed node packages
const express = require("express");
const https = require("https");

//create new express app
const app = express();

//enable express to parse URL-encoded body i.e. info from HTML form
app.use(express.urlencoded({extended: true}));

//use static files in folder called public
app.use(express.static("public"));

//loads signup page on server request
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.use('/success', function(req, res){
  res.sendFile(__dirname + '/success.html');
});
app.use("/failure", function(req, res) {
  res.sendFile(__dirname + "/failure.html")
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };



  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/dd8e819da2";

  const options = {
    method: "POST",
    auth: "[API KEY]"
  };

  const request = https.request(url, options, function(response) {

    if(response.statusCode == 200)
      res.sendFile(__dirname+"/success.html");
    else
      res.sendFile(__dirname+"/failure.html");


    response.on("data", function(data) {
      console.log(response.statusCode);
    });

  });



  request.write(jsonData);
  request.end();

});



app.listen(3000, function() {
  console.log("Server connected to port 3000.");
});
