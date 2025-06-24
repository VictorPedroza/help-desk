const { User } = require("../../models");
const { response, typeError } = require("../../utils");
const { AuthService } = require("../../services")

class AuthController {
    async register(req, res) {
        const { name, email, password, typeUser, ...extraFields } = req.body;

        const fields = { name, email, password, typeUser };
        let errors = Object.entries(fields)
            .filter(([_, value]) => !value || (typeof value === "string" && value.trim() === ""))
            .map(([key]) => key);

        if (errors.length) {
            return response(res).error({
                typeError: typeError.invalidCredentialsError,
                errors
            });
        }

        const validTypeUsers = User.schema.path("typeUser").enumValues;
        if (!validTypeUsers.includes(typeUser)) {
            return response(res).error({
                typeError: typeError.validationError,
                errors: [`O tipo de Usuário deve ser um dos seguintes: ${validTypeUsers.join(", ")}`]
            });
        }

        try {
            const result = await AuthService.register({
                name,
                email,
                password,
                typeUser,
                ...extraFields
            })

            if (result.success === false) {
                return response(res).error({
                    typeError: typeError.validationError,
                    errors: [result.message]
                })
            }

            const user = result.data;

            return response(res).success({
                message: "Usuário cadastrado",
                data: {
                    id: user._id,
                    name: user.name,
                    typeUser: user.typeUser
                }
            });

        } catch (error) {
            return response(res).error({
                typeError: typeError.serverError,
                errors: [error.message || error]
            });
        }
    }
}

module.exports = {AuthController: new AuthController()};