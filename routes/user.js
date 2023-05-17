const UserController = require("../controllers/userController");
const {verifyToken} = require("../middlware/auth");
const { registerValidator, connexionValidator } = require("../middlware/express-validator");
const router = require("express").Router();


// Page d'accueil
// router.get("/", UserController.getHome);
router.get("/user", verifyToken, UserController.getUserPage);

// User profile
router.get("/profile", UserController.getUserProfile);

// User Faq
router.get("/user-faq", UserController.getUserFaq);

// User contact
router.get("/user-contact", UserController.getUserContact);

// User contact
router.get("/user-data", UserController.getUserData);

// Deconnect user
router.get("/logout", UserController.getUserLogOut);


// Formulaire d'enregistrement
router.get("/register", UserController.getRegister);
router.post("/register", registerValidator, UserController.saveUser);

// Formulaire de connexion
router.get("/connexion", UserController.getConnexion);
router.post("/connexion", connexionValidator, UserController.userConnexion);

// -

module.exports = router;
