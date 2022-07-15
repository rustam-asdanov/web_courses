const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log(`Server listen at port ${port}`);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const apiKey = "994db37dc24b71733acf392b9478cb80";
  const cityName = req.body["cityName"];
  const unit = req.body["tempTypeSelect"];

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const currentTemperature = weatherData["main"]["temp"];
      const hummidity = weatherData["main"]["humidity"];
      const weatherCond = weatherData["weather"][0]["main"];
      const weatherIco = weatherData["weather"][0]["icon"];
      const iconURL = `http://openweathermap.org/img/wn/${weatherIco}@4x.png`;

      res.write(`<h1>City ${cityName}<h1>`);
      res.write(`<h1>Weather condition ${weatherCond}</h1>`);
      res.write(`<h1>Temperature is ${currentTemperature}</h1>`);
      res.write(`<h1>Humidity is ${hummidity}%</h1>`);
      res.write(`<span>Weather ICON</span>`);
      res.write(`<img src=${iconURL} alt=${weatherCond}>`);
      res.send();
    });
  });
});
