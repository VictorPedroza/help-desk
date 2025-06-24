const { User, Applicant, Technical, Admin } = require("../../models");
const { Password } = require('../../utils')

class AuthService {
    async register({ name, email, password, typeUser, ...extraFields }) {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return { success: false, message: "E-mail já cadastrado" }
        }

        const hashPassword = await Password.hash(password)
        if(!hashPassword.success) {
            return { success: hashPassword.success, message: hashPassword.errors }
        } 

        const baseData = {
            name,
            email,
            password: hashPassword.hash,
            status: "active",
        };

        const userFactories = {
            applicant: (data) => Applicant.create(data),
            technical: (data) => Technical.create(data),
            admin: (data) => Admin.create(data),
        };

        const createUser = userFactories[typeUser.toLowerCase()];

        if (!createUser) {
            return { success: false, message: "Tipo de Usuário inválido." }
        }

        const user = await createUser({ ...baseData, ...extraFields });

        return { success: true, data: user };
    }
}

module.exports = new AuthService;
