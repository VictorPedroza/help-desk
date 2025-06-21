// app.js ou server.js
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const User = require("./models/User/types/applicantModel");

const { response, typeError } = require("./utils");

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("API is Running");
});

app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            response(res).error({
                typeError: typeError.validationError,
                message: "Funcionou",
                errors: ["Erro"]
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            status: "active"
        });


        return response(res).success({  // <-- CORRIGIDO aqui, dois c's e com return
            message: 'Funcionou certinho!',
            data: {
                id: user._id,
                name: user.name
            }
        });

    } catch (error) {
        response(res).error({
            typeError: typeError.serverError,
            errors: [error]
        })
    }
});

app.listen(8088, () => {
    console.log(`API is Running!`);
});
