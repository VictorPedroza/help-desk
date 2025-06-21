// app.js ou server.js
const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is Running");
});

const Routes = require("./routes");
app.use("/api", Routes);

app.listen(8088, () => {
    console.log(`API is Running!`);
});
