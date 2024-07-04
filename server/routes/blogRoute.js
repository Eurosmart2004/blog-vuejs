const express = require("express");
const { checkToken } = require("../authentication/auth");
const router = express.Router();
const cors = require("cors");
const blogController = require("../controllers/blogController");
const upload = require("../configs/multer");
const init = (app) => {
  router.get("/", (req, res) => {
    console.log(req.headers);
    res.send("Blog is working");
  });

  router.get("/getAll", blogController.handleGetAllBlogs);

  router.get(
    "/getByUser/:blogByUserId",
    checkToken,
    blogController.handleGetBlogByUserId
  );

  router.get("/getBlog/:blogId", blogController.handleGetBlogById);

  router.post(
    "/create",
    checkToken,
    upload.single("blogImage"),
    blogController.handleAddBlog
  );

  router.put(
    "/update",
    checkToken,
    upload.single("blogImage"),
    blogController.handleUpdateBlog
  );

  router.delete("/delete/:blogId", checkToken, blogController.handleDeleteBlog);

  return app.use("/blog", router);
};

module.exports = { init };
