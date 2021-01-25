const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
  manufacturer: {
    type: String,
    required: true,
    trim: true,
  },
  displaySize: {
    type: Number,
    required: true,
    min: 0,
  },
  cpu: {
    type: String,
    required: true,
    trim: true,
  },
  ram: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Laptop = mongoose.model("Laptop", laptopSchema);
module.exports = Laptop;
