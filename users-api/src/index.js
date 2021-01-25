const express = require("express");
const cors = require("cors");

const port = process.env.PORT;
require("./db/mongoose");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(port, () => {
  console.log("server conected,port", port);
});
