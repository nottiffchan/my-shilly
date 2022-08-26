const express = require("express");
const router = express.Router();
const {getAllUsers, getUserByUsername, getUserById, updateUser, likeUser, unlikeUser, hasLiked} = require("../controllers/user");

router.route("/getUsers").get(getAllUsers);

router.route("/getUserByUsername").get(getUserByUsername);

router.route("/getUserById").get(getUserById);

router.route("/updateUser").post(updateUser);

router.route("/like").post(likeUser);

router.route("/unlike").post(unlikeUser);

router.route("/hasLiked").post(hasLiked);

module.exports = router;