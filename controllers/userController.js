const { validationResult } = require("express-validator");
// const cookieParser = require('cookie-parser');
require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const UserController = class {
  //Afficher la page d'accueil
  // static getHome = (req, res) => {
  //   res.render("accueil");
  // };

  //Afficher la page de lutilisateur
  static getUserPage = (req, res) => {
    // const user = req.user;
    // const token = req.cookies.token;
    // if (user) {
    //   const users = await User.findById(user.id);
    //   res.json({ Users: users });
    //   res.render("userPage", {users})
    // }
    // const token = req.headers.authorization.split(" ")[1];
    res.render("user/index");
    // res.redirect("/connexion");
  };

  // User profile
  static getUserProfile = (req, res) => {
    res.render("user/users-profile");
  };

  // User pages faq
  static getUserFaq = (req, res) => {
    res.render("user/pages-faq");
  };

  // User Contact
  static getUserContact = (req, res) => {
    res.render("user/pages-contact");
  };

  // User Table data
  static getUserData = (req, res) => {
    res.render("user/tables-data");
  };

  //Deconnecter l'utilisateur
  static getUserLogOut = async (req, res) => {
    res.cookie("jwt", "", {
      maxAge: 1,
    });
    res.redirect("/");
    // res.redirect("/connexion");
  };

  //Afficher le formulaire d'enregistrement
  static getRegister = (req, res) => {
    res.render("register", {
      message: "",
      userinfos: "",
      success: null,
      error_msg: "",
    });
  };

  //Enregistrer un utilisateur
  static saveUser = (req, res) => {
    console.log(req.body);
    const { nom, prenom, email, password, repeatepassword } = req.body;
    // console.log(nom, prenom, password);
    const salt = bcrypt.genSaltSync(10);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.mapped();
      res.render("register", {
        message: error,
        userinfos: req.body,
        success: null,
        error_msg: "",
      });
    } else {
      const succes_msg = "Membre enregistrer avec succes";
      User.findOne({ email })
        .then((result) => {
          if (result) {
            console.log("email exit deja");
            res.render("register", {
              success: "",
              message: "",
              userinfos: req.body,
              error_msg: "Email exist déja",
            });
          } else {
            const hashPassword = bcrypt.hashSync(password, salt);
            // console.log("Password hash", hashPassword);
            const user = new User({
              nom,
              prenom,
              email: email.toLowerCase(),
              password: hashPassword,
            });
            user
              .save()
              .then(() => {
                console.log("Enregistrement réussie");
                res.render("register", (msg = "Enregistrement réussie"));
              })
              .catch((err) => {
                console.log(err);
              });

            res.render("register", {
              message: "",
              userinfos: "",
              success: succes_msg,
              error_msg: "",
            });
          }
        })
        .catch((err) => {});
    }
  };

  //Afficher le formulaire de connexion
  static getConnexion = (req, res) => {
    res.render("connexionForm", { message: "", userinfos: "", error_msg: "" });
  };

  //Connecter un utilisateur
  static userConnexion = async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
      const error = errors.mapped();
      console.log("Erreur: ", error);
      res.render("connexionForm", {
        message: error,
        userinfos: req.body,
        error_msg: "",
      });
    } else {
      let user = await User.findOne({ email });

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            // email: user.email,
            // prenom: user.prenom,
          },
          process.env.SECRET_TOKEN,
          { expiresIn: "2h" }
        );

        // save user token
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });

        // localStorage.setItem("Token", token)

        // save user token
        // req.token = token;
        // res.status(200).json({ token: token, user: user });
        // res.render("userPage");
        // console.log("user with token", user);

        // console.log("User infos", user, token);
        res.redirect("/user");
      } else {
        const error_msg = "Email ou mot de passe incorrecte";
        console.log("Email ou mot de passe incorrect", user);
        res.render("connexionForm", {
          error_msg,
          message: "",
          userinfos: req.body,
        });
      }

      // .then((result) => {
      //   console.log("result", result);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    }
  };
};

module.exports = UserController;
