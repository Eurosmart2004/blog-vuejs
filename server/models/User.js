const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const User = mongoose.model(
  "User",
  new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imagePath: { type: String, required: false },
  })
);

module.exports = User;
