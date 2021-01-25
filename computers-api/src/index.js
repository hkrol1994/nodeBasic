const express = require("express");
const cors = require("cors");

require("./db/mongoose");
const port = process.env.PORT;
const laptopsRouter = require("./routers/laptopsRouter");

const app = express();

app.use(express.json());
app.use(cors());
app.use(laptopsRouter);

app.listen(port, () => {
  console.log("server connected port", port);
});
