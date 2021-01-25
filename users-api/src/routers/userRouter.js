const express = require("express");
const User = require("../models/userModel");

const router = new express.Router();

router.post("/users/new", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/users/get", async (req, res) => {
  const _id = req.query._id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "worng id",
      });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/users/get-all", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).send({
        status: 404,
        message: "no users",
      });
    }
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/users/edit", async (req, res) => {
  const allowdUpdates = ["name", "age", "email", "password"];
  for (let update in req.body) {
    if (!allowdUpdates.includes(update)) {
      return res.status(400).send({
        status: 400,
        message: "Invalid update: " + update,
      });
    }
  }
  const _id = req.query.id;

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "wrong id",
      });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/users/delete", async (req, res) => {
  const _id = req.query.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "wrong id",
      });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/users/search", async (req, res) => {
  const allowdSearch = ["name", "age", "email", "password"];
  for (search in req.body) {
    if (!allowdSearch.includes(search)) {
      return res.status(400).send({
        status: 400,
        message: "Invalid search: " + search,
      });
    }
  }
  try {
    const users = await User.find(req.body);
    if (!users) {
      res.status(404).send({
        status: 404,
        message: "no users",
      });
    }
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
