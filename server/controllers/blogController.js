const { blogService, userService } = require("../services/index");
const HttpStatusCode = require("../exceptions/HttpStatusCode");

// Add blog
const handleAddBlog = async (req, res) => {
  const { blogTitle, blogHTML, datePost } = req.body;
  const blogImage = req.file;
  const author_id = req.user_id;
  if (
    blogTitle === "" ||
    blogHTML === "" ||
    datePost === "" ||
    blogImage === "" ||
    author_id === ""
  ) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }

  if (req.user_id !== author_id) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Not valid user to add blog",
    });
    return;
  }

  let existingUser = await userService.findUserById(author_id);
  if (!existingUser) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Not valid user to add blog",
    });
    return;
  }
  try {
    const blog = await blogService.addBlog({
      blogTitle,
      blogHTML,
      blogImage,
      datePost,
      author_id,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const handleGetBlogByUserId = async (req, res) => {
  const { blogByUserId } = req.params;
  if (blogByUserId === "") {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "User ID is required",
    });
  }
  try {
    const blog = await blogService.getBlogByUserId(blogByUserId);
    res.status(HttpStatusCode.OK).json({
      message: "Blog retrieved successfully",
      blog,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const handleGetBlogById = async (req, res) => {
  const { blogId } = req.params;
  if (blogId === "") {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Blog ID is required",
    });
  }
  try {
    const blog = await blogService.getBlogById({ blogId });
    res.status(HttpStatusCode.OK).json({
      message: "Blog retrieved successfully",
      blog,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const handleGetAllBlogs = async (req, res) => {
  try {
    const blog = await blogService.getAllBlogs();
    res.status(HttpStatusCode.OK).json({
      message: "All blogs retrieved successfully",
      blog,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const handleUpdateBlog = async (req, res) => {
  const { blogTitle, blogHTML, datePost, blogId } = req.body;
  const blogImage = req.file;
  if (blogTitle === "" || blogHTML === "" || datePost === "" || blogId === "") {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }

  const user_id = req.user_id;

  try {
    const blog = await blogService.updateBlog({
      blogId,
      blogTitle,
      blogHTML,
      blogImage,
      datePost,
      user_id,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const handleDeleteBlog = async (req, res) => {
  const { blogId } = req.params;
  if (blogId === "") {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Blog ID is required",
    });
  }

  const user_id = req.user_id;

  try {
    const blog = await blogService.deleteBlog({ blogId, user_id });
    res.status(HttpStatusCode.OK).json({
      message: "Blog deleted successfully",
      blog,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

module.exports = {
  handleAddBlog,
  handleGetBlogByUserId,
  handleGetBlogById,
  handleGetAllBlogs,
  handleUpdateBlog,
  handleDeleteBlog,
};
