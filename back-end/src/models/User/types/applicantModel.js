const mongoose = require("mongoose")
const User = require("../userModel")

const applicantModel = new mongoose.Schema({
    department: {
        type: String,
    },
    typeUser: {
        type: String,
        default: "applicant"
    }
})

module.exports = User.discriminator("Applicant", applicantModel)