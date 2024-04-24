require("dotenv").config();
const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello, Bhai!");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server started!");
});
