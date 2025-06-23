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
      typeError: typeError.missingCredentialsError,
      errors
    });
  }

  // Pega enum do modelo pra validar typeUser
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

    let user;

    switch (typeUser) {
      case "applicant":
        const { department } = req.body;
        user = await Applicant.create({
          name,
          email,
          password,
          department,
          status: "active"
        });
        break;

      case "technical":
        const { availability } = req.body;""
        user = await Technical.create({
          name,
          email,
          password,
          availability,
          status: "active"
        });
        break;

      case "admin":
        const { permissions } = req.body;
        user = await Admin.create({
          name,
          email,
          password,
          permissions,
          status: "active"
        });
        break;
    }

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
