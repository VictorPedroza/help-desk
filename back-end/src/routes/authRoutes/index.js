const express = require("express");
const router = express.Router();

const { Admin } = require("../../models"); // Ajuste aqui, depende do seu projeto
const { response, typeError } = require("../../utils");

router.get("/", (req, res) => {
    return res.status(200).json({
        message: "API Auth is Running" 
    });
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        const userExists = await Admin.findOne({ email });
        if (userExists) {
            return response(res).error({   // <-- return importante aqui
                typeError: typeError.validationError,
                message: "Usuário já existe",
                errors: ["E-mail já cadastrado"]
            });
        }

        const user = await Admin.create({
            name,
            email,
            password,  // Trocar pelo hashedPassword no código real
            status: "active"
        });

        return response(res).success({
            message: 'Funcionou certinho!',
            data: {
                id: user._id,
                name: user.name
            }
        });

    } catch (error) {
        return response(res).error({
            typeError: typeError.serverError,
            errors: [error]
        });
    }

});

module.exports = router;
