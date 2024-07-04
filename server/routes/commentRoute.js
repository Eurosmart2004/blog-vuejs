const express = require("express");
const { checkToken } = require("../authentication/auth");
const router = express.Router();
const commentController = require("../controllers/commentController");

const init = (app) => {
  router.get("/", (req, res) => {
    console.log(req.headers);
    res.send("Comment is working");
  });

  router.get(
    "/getRootComments/:blogId",
    commentController.handleGetRootComments
  );

  router.get("/getComment/:commentId", commentController.handleGetComment);

  router.post(
    "/addRootComment",
    checkToken,
    commentController.handleAddRootComment
  );

  router.post(
    "/addReplyComment",
    checkToken,
    commentController.handleAddReplyComment
  );

  router.put(
    "/editComment/:commentId",
    checkToken,
    commentController.handleEditComment
  );

  router.delete(
    "/deleteComment/:commentId",
    checkToken,
    commentController.handleDeleteComment
  );

  return app.use("/comment", router);
};

module.exports = { init };
