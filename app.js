const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "eb45fd5d2344a81d71047d135b6ed8f2"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
    https.get(url, function(response) {
      console.log(response.statusCode);
      console.log(req.body.cityName);
      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        // temp = temp - 273.3;
        const weatherDescript = weatherData.weather[0].description;
        const iconId = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + iconId + "@2x.png"
        res.set("Content-Type", "text/html");
        res.write("The weather is " + weatherDescript + " and " + temp + " C <br>");
        res.write("<h1>Aur Bhai Waha Pe Mausam Kaisa Hai</h1><br>");
        res.write("<img src ="+ imageURL + "> ")
        res.send()
    })
  })
});


app.listen(3000, function() {
  console.log("server is running in 3000");
});
