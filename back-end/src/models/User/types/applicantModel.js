const mongoose = require("mongoose")
const User = require("../userModel")
const technicalModel = require("./technicalModel")

const applicantModel = new mongoose.Schema({
    department: {
        type: String,
    },
    typeUser: {
        type: String,
        default: "applicant"
    }
})

applicantModel.pre('valitate', function(next) {
    this.typeUser = "applicant"
    next()
})

module.exports = User.discriminator("Applicant", applicantModel)