const typeError = {
  validationError: {
    statusCode: 400,
    message: "Erro de validação",
    description: "Os dados enviados não passaram na validação."
  },
  authenticationError: {
    statusCode: 401,
    message: "Não autorizado",
    description: "É necessário autenticar para acessar este recurso."
  },
  forbiddenError: {
    statusCode: 403,
    message: "Proibido",
    description: "Você não tem permissão para acessar este recurso."
  },
  notFoundError: {
    statusCode: 404,
    message: "Recurso não encontrado",
    description: "O recurso solicitado não foi encontrado."
  },
  conflictError: {
    statusCode: 409,
    message: "Conflito",
    description: "O recurso que você tentou criar já existe."
  },
  serverError: {
    statusCode: 500,
    message: "Erro interno do servidor",
    description: "Ocorreu um erro inesperado no servidor."
  }
};

module.exports = { typeError };
