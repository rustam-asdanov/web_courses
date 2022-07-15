const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const queryCity = req.body.cityName;
  const apiKey = "994db37dc24b71733acf392b9478cb80";
  const tempType = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&units=${tempType}`;

  https.get(url, function (response) {
    console.log("Status code " + response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const city = weatherData["name"];
      const temperature = weatherData["main"]["temp"];
      const description = weatherData["weather"][0]["description"];
      const image = `http://openweathermap.org/img/wn/${weatherData["weather"][0]["icon"]}@4x.png`;
      res.write(
        `<h1>The temperature in ${city} is ${temperature} degrees Celcius.</h1>`
      );
      res.write(`<h2>The weather is currently ${description}</h2>`);
      res.write(`<img src=${image} alt="${description}">`);
      res.send();
    });
  });
});
