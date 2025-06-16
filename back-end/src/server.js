const express = require("express")
const app = express()
const connectDB = require("./config/db")

connectDB()

app.get("/", (req, res) => {
    res.send("API is Running")
})

app.listen(8088, () => {
    console.log(`API is Running!`)
})