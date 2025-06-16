const mongoose = require("mongoose")
const User = require("../userModel")

const adminModel = new mongoose.Schema({
    permissions: {
        type: String,
        enum: ["total", "partial"],
        default: "total"
    },
    typeUser: {
        type: String,
        default: "admin"
    },
})

module.exports = User.discriminator("Admin", adminModel)