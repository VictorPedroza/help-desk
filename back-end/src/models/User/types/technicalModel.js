const mongoose = require("mongoose")
const User = require("../userModel")

const technicalModel = new mongoose.Schema({
    availability: {
        type: Boolean,
        default: true
    }
})

technicalModel.pre('validate', function (next) {
    this.typeUser = "technical"
    next()
})

module.exports = User.discriminator("Technical", technicalModel)