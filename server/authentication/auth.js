const HttpStatusCode = require("../exceptions/HttpStatusCode");
const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  // Pass login, register
  if (
    req.url.toLowerCase().trim() === "/user/login" ||
    req.url.toLowerCase().trim() === "/user/register" ||
    req.url.toLowerCase().trim() === "/user/logout"
  ) {
    next();
    return;
  }
  // Check token
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Token is expired",
      });
      res.end();
    } else {
      req.user_id = jwtObject._id;
      next();
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

module.exports = { checkToken };
