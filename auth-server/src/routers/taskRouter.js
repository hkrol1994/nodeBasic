const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/teskModel");

const router = new express.Router();

router.post("/tasks/new", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    user: req.user._id,
  });

  try {
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks/get", auth, async (req, res) => {
  const _id = req.query.id;
  try {
    const task = await Task.findOne({ _id, user: req.user._id });
    if (!task) {
      return res.status(404).send({
        status: 404,
        message: "No task",
      });
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/tasks/delete", auth, async (req, res) => {
  const _id = req.query.id;
  try {
    const task = await Task.findByIdAndDelete({ _id, user: req.user._id });
    if (!task) {
      return res.status(404).send({
        status: 404,
        message: "No task",
      });
    }
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/edit", auth, async (req, res) => {
  const allowdUpdates = ["deccription", "completed"];
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
    const task = await Task.findOneAndUpdate(
      { _id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).send({
        status: 404,
        message: "No task",
      });
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/tasks/all", auth, async (req, res) => {
  const match = {};
  const options = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.limit) {
    options.limit = parseInt(req.query.limit);
  }
  if (req.query.skip) {
    options.skip = parseInt(req.query.skip);
  }

  if (req.query.sortDate) {
    options.sort = {};
    options.sort.createdAt = req.query.sortDate === "desc" ? -1 : 1;
  }
  try {
    // await req.user.populate("tasks").execPopulate();
    await req.user
      .populate({
        path: "tasks",
        macth,
        options,
      })
      .execpopulate();
    res.send(req.user.tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
