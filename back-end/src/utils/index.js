// utils/index.js
const { response } = require("./response/response");
const { typeError } = require("./response/typeError");
const Password = require("./password/hashedPassword")


module.exports = { response, typeError, Password };
