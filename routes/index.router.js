const LayoutController = require("../controllers/indexController");

const router = require("express").Router();

router.get("/",LayoutController.getLayout);

module.exports = router;
