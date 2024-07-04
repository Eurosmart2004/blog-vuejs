const { Comment } = require("../models/index");
const mongoose = require("mongoose");

const addRootComment = async ({ content, blogId, userId }) => {
  const newComment = new Comment({
    content,
    blogId,
    userId,
    root: true,
    createdAt: Date.now(),
  });
  return newComment.save();
};

const getRootComments = async ({ blogId }) => {
  return Comment.find({ blogId, root: true });
};

const getComment = async ({ commentId }) => {
  return Comment.findById(commentId);
};

const addReplyComment = async ({ content, blogId, userId, commentId }) => {
  const newComment = new Comment({
    commentParrentId: commentId,
    content,
    blogId,
    userId,
    root: false,
    createdAt: Date.now(),
  });
  const comment = await Comment.findById(commentId);
  comment.replyId.push(newComment._id);
  await comment.save();
  return newComment.save();
};

const editComment = async ({ commentId, content }) => {
  const comment = await Comment.findById(commentId);
  comment.content = content;
  comment.updatedAt = Date.now();
  return comment.save();
};

const deleteComment = async ({ commentId }) => {
  const comment = await Comment.findById(commentId);

  if (comment.commentParrentId) {
    const parentComment = await Comment.findById(comment.commentParrentId);
    parentComment.replyId = parentComment.replyId.filter(
      (replyId) => replyId.toString() !== commentId
    );
    await parentComment.save();
  }

  if (comment.replyId.length > 0) {
    for (let replyId of comment.replyId) {
      await deleteComment({ commentId: replyId });
    }
  }
  return Comment.findByIdAndDelete(commentId);
};
module.exports = {
  addRootComment,
  getRootComments,
  addReplyComment,
  getComment,
  editComment,
  deleteComment,
};
