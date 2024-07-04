const { commentService } = require("../services/index");
const HttpStatusCode = require("../exceptions/HttpStatusCode");

const handleAddRootComment = async (req, res) => {
  try {
    const { content, blogId, userId } = req.body;
    if (!content || !blogId || !userId) {
      throw new Error("Content, blogId, userId are required");
    }
    if (userId !== req.user_id) throw new Error("Unauthorized");

    const newComment = await commentService.addRootComment({
      content,
      blogId,
      userId,
    });
    res.status(HttpStatusCode.CREATED).json({
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

const handleGetRootComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!blogId) throw new Error("BlogId is required");

    const comments = await commentService.getRootComments({ blogId });
    const commentsId = [];
    comments.forEach((comment) => {
      commentsId.push({
        _id: comment._id,
      });
    });
    res.status(HttpStatusCode.OK).json({ comments: commentsId });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

const handleGetComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) throw new Error("CommentId is required");

    const comment = await commentService.getComment({ commentId });
    res.status(HttpStatusCode.OK).json({ comment });
  } catch (error) {
    console.log(error);
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

const handleAddReplyComment = async (req, res) => {
  try {
    const { content, blogId, userId, commentId } = req.body;
    if (!content || !blogId || !userId || !commentId) {
      throw new Error("Content, blogId, userId, commentId are required");
    }
    if (userId !== req.user_id) throw new Error("Unauthorized");

    const newComment = await commentService.addReplyComment({
      content,
      blogId,
      userId,
      commentId,
    });
    res.status(HttpStatusCode.CREATED).json({
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

const handleEditComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content, userId } = req.body;
    if (!commentId || !content || !userId) {
      throw new Error("CommentId, content, userId are required");
    }
    if (userId !== req.user_id) throw new Error("Unauthorized");

    await commentService.editComment({ commentId, content });
    res
      .status(HttpStatusCode.OK)
      .json({ message: "Comment edited successfully" });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

const handleDeleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) throw new Error("CommentId is required");

    await commentService.deleteComment({ commentId });
    res
      .status(HttpStatusCode.OK)
      .json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
  }
};
module.exports = {
  handleAddRootComment,
  handleGetRootComments,
  handleAddReplyComment,
  handleGetComment,
  handleEditComment,
  handleDeleteComment,
};
