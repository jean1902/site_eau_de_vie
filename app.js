const express = require("express");
const user_router = require("./routes/user");
const admin_router = require("./routes/admin.router");
const layout_router = require("./routes/index.router");


const connectDb = require("./database/db");
const cookieParser = require('cookie-parser');
const { checkUser } = require("./middlware/auth");
const app = express();
require("dotenv").config();
const port = 3000 || process.env.PORT;

// Extration des données du formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// middleware
app.use(express.static("public"));
app.use('/uploadImage', express.static('uploadImage'))

// view engine
app.set("views", "./views");
app.set("view engine", "ejs");

// Définition des routes
app.get("*", checkUser)
app.use(layout_router);
app.use(user_router);
app.use(admin_router);

// Connexion à la base de données
connectDb()

// Démarage du serveur
app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
