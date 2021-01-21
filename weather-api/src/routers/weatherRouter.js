const express = require("express");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const router = new express.Router();

router.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const { longitude, latitude } = await geocode(city);
    const weatherData = await forecast(latitude, longitude);
    console.log(weatherData);
    res.send({ city, ...weatherData });
  } catch (err) {
    if (err.status === 404) {
      res.status(404).send(err);
    }
  }
});
module.exports = router;
