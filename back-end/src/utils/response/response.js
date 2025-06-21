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
    }
});

module.exports = { response };
