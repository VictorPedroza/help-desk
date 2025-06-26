// Importações
const express = require("express");
const router = express.Router();

// Importação do Controller de Autenticação
const { AuthController } = require("@/controllers")

// Rota de Register
router.post('/register', AuthController.register)

// Rota de Login
router.post('/login', AuthController.login)

// Rota de Logou
router.get('/logout', AuthController.logout)

router.get("/check", AuthController.check)
// Exportação
module.exports = router;
