const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new Schema({
    root: {
      type: Boolean,
      default: false,
    },
    commentParrentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    replyId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  })
);

module.exports = Comment;
