const mongoose = require("mongoose")
const User = require("../userModel")

const adminModel = new mongoose.Schema({
    permissions: {
        type: String,
        enum: ["total", "partial"],
        default: "total"
    }
})

adminModel.pre('validate', function (next) {
    this.typeUser = 'admin';
    next();
})

module.exports = User.discriminator("Admin", adminModel)