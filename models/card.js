const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    front: { type: String, required: true },
    back: { type: String, required: true },
    folderId: { type: String, required: true },
    timestamp: { type: Date },
});

module.exports = mongoose.model("Card", CardSchema);