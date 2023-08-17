const express = require("express");
const router = express.Router({ mergeParams: true });
const cardController = require("../controllers/cardController");
const verifyToken = require("../config/verifyToken");

// create card
router.post("/", commentrController.create_card);

// edit card
router.put("/:id/edit", verifyToken, commentrController.edit_card);

// delete card
router.delete("/:id/delete", verifyToken, commentrController.delete_card);

module.exports = router;