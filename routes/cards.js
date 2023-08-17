const express = require("express");
const router = express.Router({ mergeParams: true });
const cardController = require("../controllers/cardController");
const verifyToken = require("../config/verifyToken");

// GET all cards
router.get("/", cardController.cards);

// POST create card
router.post("/", cardController.create_card);

// PUT edit card
router.put("/:id/edit", verifyToken, cardController.edit_card);

// DELETE delete card
router.delete("/:id/delete", verifyToken, cardController.delete_card);

module.exports = router;