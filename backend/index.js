const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "https://paytm-app-basic.vercel.app",
    methods: "GET,PUT,POST, DELETE,PATCH,HEAD",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello, Bhai!");
});
app.listen(3000, () => {
  console.log("server started!");
});
