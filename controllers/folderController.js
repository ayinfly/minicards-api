require("dotenv").config();
const Folder = require("../models/folder");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// get all folder
exports.folders = function (req, res) {
  Folder.find()
    .sort([["timestamp", "descending"]])
    .populate("author")
    .exec((err, folders) => {
      if (err) return res.json(err);

      return res.json(folders);
    });
};

// create folder
exports.create_folder = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },

  // validate and sanitize
  body("title", "title cannot be empty").trim().isLength({ min: 1 }).escape(),

  // process request
  async (req, res) => {
    // extract errors
    const errors = validationResult(req);
    console.log(errors.array())
    if (!errors.isEmpty()) return res.json({ error: 'title cannot be empty' });

    const { title } = req.body;

    Folder.create(
      {
        title,
        author: req.authData._id,
        timestamp: Date.now(),
      },
      (err, folder) => {
        if (err) return res.json(err);

        folder.populate("author", (err, newFolder) => {
          if (err) return res.json(err);

          return res.json(newFolder);
        });
      }
    );
  },
];

// update folder
exports.folder_update = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },

  // validate and sanitize
  body("title", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),

  // process request
  (req, res) => {
    // extract errors
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
      return res.json({ error: 'title cannot be empty' });
    }

    // create new folder object
    const folder = new Folder({
      title: req.body.title,
      author: req.authData._id,
      timestamp: Date.now(),
      _id: req.params.id,
    });

    // update folder
    Folder.findByIdAndUpdate(req.params.id, folder, { new: true })
      .populate("author")
      .exec((err, newFolder) => {
        if (err) return res.json(err);

        return res.json(newFolder);
      });
  },
];

// delete folder
exports.delete_folder = function (req, res) {
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },
    Folder.findByIdAndRemove(req.params.id, function (err) {
      if (err) return res.json(err);

      res.json({
        message: "folder deleted successfully",
      });
    });
};

// get single folder
exports.folder_get = function (req, res) {
  Folder.findById(req.params.id)
    .populate("author")
    .exec((err, folder) => {
      if (err) return res.json(err);

      return res.json(folder);
    });
};

// get folders by an author
exports.folders_by_author = function (req, res) {
    const authorId = req.params.id; // Assuming the author's ID is passed as a parameter in the request
  
    Folder.find({ author: authorId })
      .sort({ _id: -1 })
      .populate("author")
      .exec((err, folders) => {
        if (err) return res.json(err);
  
        return res.json(folders);
      });
  };
  