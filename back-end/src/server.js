// app.js ou server.js
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser")
const cors = require("cors")

connectDB();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("API is Running");
});

const Routes = require("./routes");
app.use("/api", Routes);

app.listen(8088, () => {
    console.log(`API is Running!`);
});
