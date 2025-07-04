const { User, Applicant, Technical, Admin } = require("../../models");
const { Password } = require('../../utils')
const jwt = require('jsonwebtoken')

class AuthService {
    async register({ name, email, password, typeUser, ...extraFields }) {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return { success: false, message: "E-mail já cadastrado" }
        }

        const hashPassword = await Password.hash(password)
        if (!hashPassword.success) {
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

        return { success: true, user: user };
    }
    async login({ email, password }) {
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return { status: false, message: "Credenciais Inválidas" }
        }

        const isValidPassword = await Password.compare(password, existUser.password);
        if (!isValidPassword.isMatch) {
            return { status: false, message: "Credenciais Inválidas" }
        }

        const token = jwt.sign({
            userId: existUser._id,
            name: existUser.name,
            email: existUser.email,
            typeUser: existUser.__t
        }, process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        const data = {
            user: {
                id: existUser._id,
                email: existUser.email,
                typeUser: existUser.__t,
            },
            token: token
        }

        return data
    }
    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            return {
                success: true,
                user: {
                    id: decoded.userId,
                    name: decoded.name,
                    email: decoded.email,
                    typeUser: decoded.typeUser
                }
            }
        } catch(error) {
            return { success: false }
        }
    }
}

module.exports = new AuthService;
