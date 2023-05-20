const UserController = require("../controllers/userController");
const {verifyToken} = require("../middlware/auth");
const { registerValidator, connexionValidator } = require("../middlware/express-validator");
const { uploadUserImage } = require("../middlware/multer");
const router = require("express").Router();
// const multer = require('multer')
// const upload = multer({ dest: 'public/uploads/' })


// Page d'accueil
// router.get("/", UserController.getUser);

// User profile
router.get("/user", verifyToken, UserController.getUserPage);

// User profile
router.get("/profile", verifyToken, UserController.getUserProfile);

// User Faq
router.get("/user-faq", verifyToken, UserController.getUserFaq);

// User contact
router.get("/user-contact", verifyToken, UserController.getUserContact);

// User discution
router.get("/user-discution", verifyToken, UserController.getUserDiscution);

// User List
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
// userProfileEdit
router.post("/userProfileEdit", uploadUserImage.single('userprofile'), UserController.EditUserProfile);

module.exports = router;
