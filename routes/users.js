const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const folderController = require("../controllers/folderController");

// GET all users
router.get("/", userController.users_get);

// POST login
router.post("/login", userController.login_post);

// POST signup
router.post("/signup", userController.signup_post);

// get single user
router.get("/:id", folderController.folders_by_author);

module.exports = router;