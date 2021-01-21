const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

const moshe = new User({
  name: "moshe",
  age: 23,
});

moshe
  .save()
  .then((res) => {
    console.log(moshe);
  })
  .catch((err) => {
    console.log(err);
  });
