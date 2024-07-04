const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Blog = mongoose.model(
  "Blog",
  new Schema({
    author_id: { type: Schema.Types.ObjectId, ref: "User" },
    blogTitle: { type: String, required: true },
    blogHTML: { type: String, required: true },
    blogImage: { type: String, required: false },
    datePost: { type: Date, required: true },
    favorite: { type: Number, required: false, default: 0 },
  })
);

module.exports = Blog;
