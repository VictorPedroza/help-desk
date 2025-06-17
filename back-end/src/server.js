const express = require("express")
const app = express()
const connectDB = require("./config/db")
const User = require("./models/User/types/applicantModel")

app.use(express.json())

connectDB()

app.get("/", (req, res) => {
    res.send("API is Running")
})

app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Validação simples
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        // Verificar se o email já existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Usuário já existe" });
        }

        // Criar novo usuário
        const user = await User.create({
            name,
            email,
            password, 
            status: "active"
        });

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user
        });

    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
});


app.listen(8088, () => {
    console.log(`API is Running!`)
})