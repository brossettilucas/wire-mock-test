const express = require("express");

const getWeather = require("./get-weather");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

router.use("/get-weather", getWeather);

module.exports = router;