const express = require("express");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");
const Weather = require("../models/weatherModel");

const router = new express.Router();

router.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const { longitude, latitude } = await geocode(city);
    const { tempature, humidity, wind, description } = await forecast(
      latitude,
      longitude
    );
    const weatherDocument = new Weather({
      city,
      tempature,
      humidity,
      wind,
      description,
    });
    await weatherDocument.save();
    res.send(weatherDocument);
  } catch (err) {
    if (err.status === 404) {
      res.status(404).send(err);
    }
  }
});

router.get("/weather-history/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const history = await Weather.find({ city });
    if (history.length > 0) {
      res.send(history);
    } else {
      res.send({
        message: "no search history",
      });
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.post("/actual-temp/:city", async (req, res) => {
  const city = req.params.city;
  const actual_temp = req.query.actual_temp;
  try {
    if (actual_temp) {
      const { longitude, latitude } = await geocode(city);
      const { tempature, humidity, wind, description } = await forecast(
        latitude,
        longitude
      );
      const weatherDocument = new Weather({
        city,
        tempature,
        humidity,
        wind,
        description,
        actual_temp,
      });
      await weatherDocument.save();
      res.send(weatherDocument);
    } else {
      res.status(400).send({
        message: "lack of actual_temp",
      });
    }
  } catch (err) {
    if (err.status === 400) {
      res.status(400).send(err);
    }
  }
});
module.exports = router;
