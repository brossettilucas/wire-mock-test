const express = require("express");
const axios = require("axios");

const router = express.Router();
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;
const PIRATE_WEATHER_API_KEY = process.env.PIRATE_WEATHER_API_KEY;

router.get("/", (req, res) => {
  const townName = req.query.city;
  const countryName = req.query.country;
  var lat;
  var lng;
  var weatherData;
  axios
    .get(
      // `https://api.opencagedata.com/geocode/v1/json?q=${townName}-${countryName}&key=${GEOCODING_API_KEY}`
      `http://localhost:8080/geocode/v1/json?q=Belo-Horizonte-Brazil`
    )
    .then((response) => {
      lat = response.data.results[0].geometry.lat;
      lng = response.data.results[0].geometry.lng;
      axios
        .get(
          // `https://api.pirateweather.net/forecast/${PIRATE_WEATHER_API_KEY}/${lat},${lng}?units=si`
          `http://localhost:8080/forecast/key/-19.9227318,-43.9450948?units=si`
        )
        .then((response) => {
          weatherData = response.data.currently;
          res.send(weatherData);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;