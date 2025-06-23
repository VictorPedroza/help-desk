const applicantModel = require("./User/types/applicantModel")
const technicalModel = require("./User/types/technicalModel")
const adminModel = require("./User/types/adminModel")
const userModel = require("./User/userModel")

module.exports = {
    User: userModel,
    Applicant: applicantModel, 
    Technical: technicalModel, 
    Admin: adminModel 
}