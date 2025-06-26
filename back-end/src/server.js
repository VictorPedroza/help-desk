// Importações de Bibliotecas
require("module-alias/register")
const express = require("express");
const cookieParser = require("cookie-parser");

// Importação de Conexão com BD
const connectDB = require("@/config/db");

// Conexão com BD
connectDB();

// Definição do App
const app = express();

// Configurações do App
app.use(express.json());
app.use(cookieParser());

// Rota inicial
app.get("/", (req, res) => {
    res.send("API is Running");
});

// Rota Principal
const Routes = require("./routes");
app.use("/api", Routes);


// Log de Iniciação do Serviço
app.listen(8088, () => {
    console.log(`API is Running!`);
});
