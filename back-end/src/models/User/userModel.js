const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    typeUser: {
        type: String,
        enum: ["admin", "technical", "applicant"],
        required: true
    },
    status: {
        type: String,
        default: "active"
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userModel);