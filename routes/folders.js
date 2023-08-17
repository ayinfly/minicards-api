const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");
const cardController = require("../controllers/cardController");
const verifyToken = require("../config/verifyToken");

// GET all folders
router.get("/", folderController.folders);

// POST create folder
router.post("/create", verifyToken, folderController.create_folder);

// PUT update folder
router.put("/:id/edit", verifyToken, folderController.folder_update);

// DELETE delete folder
router.delete("/:id/delete", verifyToken, folderController.delete_folder);

// GET single folder
router.get("/:id", folderController.folder_get);

// GET single folder cards
router.get("/:id", cardController.cards)

module.exports = router;