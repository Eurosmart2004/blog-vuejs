const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const React = mongoose.model(
  "React",
  new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    blogId: { type: Schema.Types.ObjectId, ref: "Blog" },
    reactType: { type: String, required: true },
  })
);

module.exports = React;
