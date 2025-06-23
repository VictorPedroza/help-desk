const { User, Applicant, Technical, Admin } = require("../../models");

class AuthService {
    async register({ name, email, password, typeUser, ...extraFields }) {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return { success: false, message: "E-mail já cadastrado" }
        }

        const baseData = {
            name,
            email,
            password,
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
        console.log(user)

        return { success: true, data: user };
    }
}

module.exports = AuthService;
