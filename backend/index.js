const express = require("express");
const rootRouter = require("./routes/index")
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1",rootRouter);

app.get("/", (req, res) => {
    res.send("Hello, Bhai!");
});
app.listen(3000,()=>{
    console.log("server started!")
}); 
