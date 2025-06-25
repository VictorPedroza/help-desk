const typeError = {
  validationError: {
    statusCode: 400,
    message: "Erro de validação",
    description: "Os dados enviados não passaram na validação."
  },
  missingCredentialsError: {
    statusCode: 400,
    message: "Credenciais ausentes",
    description: "É necessário informar usuário e senha para fazer login."
  },
  authenticationError: {
    statusCode: 401,
    message: "Não autorizado",
    description: "É necessário autenticar para acessar este recurso."
  },
  invalidCredentialsError: {
    statusCode: 401,
    message: "Credenciais inválidas",
    description: "Usuário ou senha incorretos. Verifique e tente novamente."
  },
  invalidTokenError: {
    statusCode: 401,
    message: "Token inválido",
    description: "O token fornecido é inválido, expirado ou foi revogado."
  },
  accountInactiveError: {
    statusCode: 403,
    message: "Conta inativa",
    description: "A conta ainda não foi ativada. Verifique seu e-mail para ativação."
  },
  accountLockedError: {
    statusCode: 423,
    message: "Conta bloqueada",
    description: "A conta foi temporariamente bloqueada por excesso de tentativas de login."
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
  userNotFoundError: {
    statusCode: 404,
    message: "Usuário não encontrado",
    description: "Nenhuma conta foi encontrada com os dados informados."
  },
  conflictError: {
    statusCode: 409,
    message: "Conflito",
    description: "O recurso que você tentou criar já existe."
  },
  tooManyRequestsError: {
    statusCode: 429,
    message: "Muitas requisições",
    description: "Você fez muitas requisições em um curto período. Tente novamente mais tarde."
  }
};

module.exports = { typeError };
