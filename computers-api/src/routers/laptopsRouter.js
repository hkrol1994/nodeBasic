const express = require("express");
const Laptop = require("../model/laptopModel");

const router = new express.Router();

router.post("/laptops/new", async (req, res) => {
  const laptop = new Laptop(req.body);
  try {
    await laptop.save();
    res.send(laptop);
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/laptops/get", async (req, res) => {
  const _id = req.query.id;

  try {
    const laptop = await Laptop.findById(id);
    if (!laptop) {
      return res.status(404).send({
        status: 404,
        message: "worng id",
      });
    }
    res.send(laptop);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/laptops/delete", async (req, res) => {
  const _id = req.query.id;

  try {
    const laptop = await Laptop.findByIdAndDelete(id);
    if (!laptop) {
      return res.status(404).send({
        status: 404,
        message: "worng id",
      });
    }
    res.send(laptop);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/laptops/edit", async (req, res) => {
  const allowedUpdates = ["manufacturer", "displaySize", "cpu", "ram", "price"];
  const _id = req.query.id;
  for (let update in req.body) {
    if (!allowedUpdates.includes(update)) {
      return res.status(400).send({
        status: 400,
        message: "Invalid update " + update,
      });
    }
  }
  try {
    const laptop = await Laptop.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!laptop) {
      return res.status(404).send({
        status: 404,
        message: "worng id",
      });
    }
    res.send(laptop);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/laptops/search", async (req, res) => {
  const allowedSearch = ["manufacturer", "displaySize", "cpu", "ram", "price"];
  for (let search in req.body) {
    if (!allowedSearch.includes(search)) {
      return res.status(400).send({
        status: 400,
        message: "Invalid search " + search,
      });
    }
  }
  try {
    const laptops = await Laptop.find(req.body);
    res.send(laptops);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
