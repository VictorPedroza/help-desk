// db.js
const mongoose = require("mongoose");
require("dotenv").config(); // Carrega variáveis do .env

const MONGO_URI = process.env.MONGO_URI;

function connectDB() {
    mongoose.connect(MONGO_URI)
    .then(() => console.log("🟢 Conectado ao MongoDB"))
    .catch((err) => console.error("🔴 Erro ao conectar ao MongoDB Atlas:", err));
}

module.exports = connectDB; // <-- Aqui você exporta a função
