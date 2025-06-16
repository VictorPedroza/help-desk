const mongoose = require("mongoose")
const User = require("../userModel")

const technicalModel = new mongoose.Schema({
    availability: {
        type: Boolean,
        required: true
    },
    typeUser: {
        type: String,
        default: "technical"
    },
})

module.exports = User.discriminator("Technical", technicalModel)