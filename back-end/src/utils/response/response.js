const response = (res) => ({
    success: ({ message = '', data = {} }) => {
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message,
            timestamp: new Date().toISOString(),
            data
        });
    },
    error: ({ typeError = {}, errors = [] }) => {
        const statusCode = typeError.statusCode;
        const description = typeError.description;
        const message = typeError.message;
        return res.status(statusCode).json({
            status: "error",
            statusCode: statusCode,
            description: description,
            message: message,
            timestamp: new Date().toISOString(),
            errors: errors
        })
    },
    server: (error) => {
        return res.status(500).json({
            status: "error",
            statusCode: 500,
            description: "Ocorreu um erro inesperado no servidor.",
            message: "Erro interno do servidor",
            timestamp: new Date().toISOString(),
            errors: [process.env.NODE_END === "development" ? error.message : "Erro interno do servidor"]
        })
    }
});

module.exports = { response };
