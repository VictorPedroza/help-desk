const bcrypt = require("bcrypt")

const SALT_ROUNDS = process.env.SALT_ROUNDS

class Password {
    static async hash(password) {
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS)
            const hash = await bcrypt.hash(password, salt)
            return { success: true, hash }
        } catch (error) {
            return { success: false, errors: "Erro ao realizar o Hash" }
        }
    }
    static async compare(password, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword)
            return {success: true, isMatch}
        } catch (error) {
            return { success: false, errors: "Erro ao realizar o Hash" }
        }
    }
}

module.exports = { Password: new Password() }