const mongoose = require("mongoose");
const Task = require("./teskModel");
const User = require("./userModel");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const populate = async () => {
  //   const task = await Task.findById("");

  //   const user = await User.findById(task.user);
  //   console.log(user);

  //   await task.populate("user").execPopulate();
  //   console.log(task.user);

  const user = await User.findById("");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

populate().then();
