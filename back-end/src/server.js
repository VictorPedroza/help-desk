const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("Hello World! The API is Running")
})

app.listen(8088, () => {
    console.log("API is Running!")
})