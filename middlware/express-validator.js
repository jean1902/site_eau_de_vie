const { check } = require("express-validator");

const registerValidator = [
  check("nom", "Le nom doit contenir 3 cacartères au minimum")
    .exists()
    .isLength({ min: 3 }),

  check("prenom", "Le nom doit contenir 3 cacartères au minimum")
    .exists()
    .isLength({ min: 3 }),

  check("email", "Votre email n'est pas conforme")
    .exists()
    .isEmail()
    .isLength({ min: 3 }),

  check("password", "Votre password doit contenir 4 caractrères au moins")
    .exists()
    .isLength({ min: 4 })
    .isLength({ min: 3 }),

  check("repeatepassword", "Repetez votre password")
    .trim()
    .isLength({ min: 4 })
    .custom(async (repeatepassword, { req }) => {
      const password = await req.body.password;
      if (password !== repeatepassword) {
        throw new Error("Mot de passe non identique");
      }
    }),
];

const connexionValidator = [
  check("email", "Votre email n'est pas conforme")
    .exists()
    .isEmail()
    .isLength({ min: 3 }),

  check("password", "Votre password doit contenir 4 caractrères au moins")
    .exists()
    .isLength({ min: 4 })
    .isLength({ min: 3 }),
];

module.exports = { registerValidator, connexionValidator };
