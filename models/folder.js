const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    timestamp: { type: Date },
});

module.exports = mongoose.model("Folder", FolderSchema);