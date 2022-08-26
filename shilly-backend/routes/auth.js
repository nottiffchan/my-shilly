const express = require("express");
const router = express.Router();
const {register, login, forgotPassword, resetPassword, checkIfEmailTaken} = require("../controllers/auth");

router.route("/signup").post(register);

router.route("/login").post(login);
 
router.route("/checkIfEmailTaken").post(checkIfEmailTaken);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:resetToken").post(resetPassword);

module.exports = router;