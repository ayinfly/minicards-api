const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, maxlength: 20, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);