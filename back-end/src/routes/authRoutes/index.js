const express = require("express");
const router = express.Router();

const { User, Applicant, Technical, Admin } = require("../../models");
const { response, typeError } = require("../../utils");

router.post("/register", async (req, res) => {
  const { name, email, password, typeUser } = req.body;

  const fields = { name, email, password, typeUser };
  let errors = Object.entries(fields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (errors.length) {
    return response(res).error({
      typeError: typeError.invalidCredentialsError,
      errors
    });
  }

  const validTypeUsers = User.schema.path("typeUser").enumValues;
  if (!validTypeUsers.includes(typeUser)) {
    return response(res).error({
      typeError: typeError.validationError,
      errors: [`O tipo de Usuário deve ser um dos seguintes: ${validTypeUsers.join(", ")}`]
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return response(res).error({
        typeError: typeError.validationError,
        errors: ["E-mail já cadastrado"]
      });
    }

    const baseData = {
        name, 
        email, 
        password,
        status: "active"
    }

    const userFactories = {
      applicant: (data) => Applicant.create({...data, department: data.department}),
      technical: (data) => Technical.create({...data, availability: data.availability}),
      admin: (data) => Admin.create({...data, permissions: data.permissions})
    }

    const createUser = userFactories[typeUser];
    if(!createUser) {
      return response(res).error({
        typeError: typeError.missingCredentialsError,
        errors: ["Tipo de usuário inválido"]
      })
    }
    const user = await createUser({...baseData, ...req.body})

    return response(res).success({
      message: "Usuário cadastrado",
      data: {
        id: user._id,
        name: user.name,
        typeUser: typeUser
      }
    });

  } catch (error) {
    return response(res).error({
      typeError: typeError.serverError,
      errors: [error.message || error]
    });
  }
});

module.exports = router;
