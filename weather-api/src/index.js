const express = require("express");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT;
const weatherRouter = require("./routers/weatherRouter");
const publicDirectoryPath = path.join(__dirname, "../public");
require("./db/mongoose");

const app = express();

app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(cors());
app.use(weatherRouter);

app.listen(port, () => {
  console.log('Server conected, port:"', port);
});
