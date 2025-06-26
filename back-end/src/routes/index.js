// Importações
const express = require('express')
const router = express.Router()

// Rota principal da API
router.get("/", (req, res) => {
    return res.status(200).json({
        message: "Main Route is Running!"
    })
})

// Rota de Autenticação
const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);

// Exportação
module.exports = router