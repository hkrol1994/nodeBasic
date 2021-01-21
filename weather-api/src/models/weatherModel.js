const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
  {
    city: {
      type: String,
    },
    tempature: {
      type: String,
    },
    humidity: {
      type: String,
    },
    wind: {
      type: String,
    },
    description: {
      type: String,
    },
    actual_temp: {
      type: String,
      default: "not entered",
    },
  },
  {
    timestamps: true,
  }
);

const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
