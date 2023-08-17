require("dotenv").config();
const Card = require("../models/card");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.cards = function (req, res) {
  Card.find()
    .sort([["timestamp", "descending"]])
    .exec((err, data) => {
      if (err) return res.json(err);

      let cards = data.filter(
        (card) => card.folderId === req.params.folder_id
      );

      return res.json(cards);
    });
};

exports.create_card = [
  body("front", "front cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("back", "back cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // process request
  (req, res) => {
    // extract errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.json(err);

    const { username, content } = req.body;

    // create card
    Card.create(
      { front, back, folderId: req.params.folder_id, timestamp: Date.now() },
      (err, card) => {
        if (err) return res.json(err);

        return res.json(card);
      }
    );
  },
];

// edit card
exports.edit_card = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      console.log(req.token);
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },

  body("front", "front cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("back", "back cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // process request
  (req, res) => {
    // extract errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.json(errors.array());

    const card = {
      front: req.body.front,
      back: req.body.back,
      folderId: req.params.folder_id,
    };

    Card.findByIdAndUpdate(
      req.params.id,
      card,
      { new: true },
      function (err, thecard) {
        if (err) return res.json();

        return res.json(thecard);
      }
    );
  },
];

// delete card
exports.delete_card = function (req, res) {
  Card.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.json(err);

    return res.json({
      message: "card deleted successfully",
    });
  });
};