const bcrypt = require("bcrypt")
require('dotenv').config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

class Password {
    async hash(password) {
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS)
            const hash = await bcrypt.hash(password, salt)
            return { success: true, hash }
        } catch (error) {
            return { success: false, errors: "Erro ao realizar o Hash" }
        }
    }
    async compare(password, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword)
            return {success: true, isMatch}
        } catch (error) {
            return { success: false, errors: "Erro ao realizar o Hash" }
        }
    }
}

module.exports = new Password()