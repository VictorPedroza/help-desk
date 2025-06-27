// Importações
const { User } = require("../../models");
const { response, typeError } = require("../../utils");
const { AuthService } = require("../../services");
const authServices = require("../../services/auth/authServices");

// Classe de Controle de Autenticação
class AuthController {
    // Função para Registrar Usuário
    async register(req, res) {
        // Entrada dos Valores de Registro
        const { name, email, password, typeUser, ...extraFields } = req.body;

        // Verificação de quais valores estão nulos os vazios
        const fields = { name, email, password, typeUser };
        let errors = Object.entries(fields)
            .filter(([_, value]) => !value || (typeof value === "string" && value.trim() === ""))
            .map(([key]) => key);

        // Caso haja algum valores obrigátorio que não tenha no req, envia na resposta quais estão faltando
        if (errors.length) {
            return response(res).error({
                typeError: typeError.invalidCredentialsError,
                errors
            });
        }

        // Validação se o Tipo de Usuário está dentro dos parametros do Sistema
        const validTypeUsers = User.schema.path("typeUser").enumValues;
        if (!validTypeUsers.includes(typeUser)) {
            return response(res).error({
                typeError: typeError.validationError,
                errors: [`O tipo de Usuário deve ser um dos seguintes: ${validTypeUsers.join(", ")}`]
            });
        }

        try {
            // Envia os valores para o registro para a função que realiza o cadastro
            const result = await AuthService.register({
                name,
                email,
                password,
                typeUser,
                ...extraFields
            })

            // Se o resultado do serviço de registro vier com erro, mostra e evidência qual foi o erro
            if (result.success === false) {
                return response(res).error({
                    typeError: typeError.validationError,
                    errors: [result.message]
                })
            }
            
            // Definição do User basedo no Result do Service
            const { user } = result;

            // Retorna mensagem de Sucesso
            return response(res).success({
                message: "Usuário cadastrado",
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    typeUser: user.typeUser
                }
            });

        } catch (error) {
            // Erro no Servidor
            return response(res).server(error)
        }
    }
    async login(req, res) {
        // Recebendo os valore para login
        const { email, password } = req.body;

        try {
            // Resultado do Serice de Login
            const result = await AuthService.login({ email, password })

            // Caso o resultado for um erro, retorna com o erro de credenciais inválidas
            if (result.status === false) {
                return response(res).error({
                    typeError: typeError.invalidCredentialsError,
                    errors: [result.message]
                })
            }

            // Retorno com sucesso, e o token para autenticação
            const { user, token } = result;

            // Gerando os Cookies
            res.cookie("auth", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3600000
            })

            // Retorno com sucesso
            return response(res).success({
                message: "Login realizado",
                data: user
            })

        } catch (error) {
            return response(res).server(error)
        }
    }
    async logout(req, res) {
        try {
            // Limpando cookes
            res.clearCookie("auth", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });

            // Retorno com sucesso
            return response(res).success({
                massage: "Logout realizado.",
                data: {}
            })
        } catch (error) {
            return response(res).server(error)
        }
    }
    async check(req, res) {
        // Puxa valor do cookies para checagem
        const token = req.cookies.auth;

        try {
            // Retorno inválido caso não tenha o token
            if(!token) {
                return response(res).error({
                    typeError: typeError.authenticationError,
                    errors: [ typeError.authenticationError.message ]
                })
            }

            // Serviço para verificar se o token é valido
            const result = await authServices.verifyToken(token);

            // Retorno caso o token for inválido
            if(!result.success) {
                return response(res).error({
                    typeError: typeError.authenticationError,
                    errors: [ typeError.authenticationError.message ]
                })
            }


            // Retorno com sucesso
            return response(res).success({
                message: "Usuário autenticado",
                data: result.user
            })



        } catch(error) {
            return response(res).server(error)
        }
    }
}

module.exports = { AuthController: new AuthController() };