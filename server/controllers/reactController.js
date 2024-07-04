const { reactService } = require("../services/index");
const HttpStatusCode = require("../exceptions/HttpStatusCode");
const handleAddReact = async (req, res) => {
  const { blogId, reactType } = req.body;
  const userId = req.user_id;
  if (!blogId || !reactType) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Missing required fields",
    });
  }
  const react = await reactService.addReact({ blogId, userId, reactType });
  if (!react) {
    return res.status(HttpStatusCode.OK).json({
      message: "React removed",
    });
  }
  return res.status(HttpStatusCode.CREATED).json(react);
};

const handleGetReact = async (req, res) => {
  const { blogId } = req.query;
  const userId = req.user_id;
  if (!blogId) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Missing required fields",
    });
  }
  const react = await reactService.getReact({ blogId, userId });
  if (!react) {
    return res.status(HttpStatusCode.OK).json({
      message: "No react found",
    });
  }
  return res.status(HttpStatusCode.OK).json({
    react,
    message: "React found",
  });
};

const handleGetAll = async (req, res) => {
  const { blogId } = req.query;
  const { reacts, mostCommonReacts } = await reactService.getAll({ blogId });

  return res
    .status(HttpStatusCode.OK)
    .json({ numberReact: reacts.length, mostCommonReacts });
};

module.exports = {
  handleAddReact,
  handleGetReact,
  handleGetAll,
};
