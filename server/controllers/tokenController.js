const { tokenService } = require("../services/index");
const HttpStatusCode = require("../exceptions/HttpStatusCode");

const handleCreteRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(HttpStatusCode.FORBIDDEN)
      .send({ error: "No refresh token provided" });
  }
  try {
    const { newAccessToken, newRefreshToken } =
      await tokenService.createNewAccessRefreshToken(refreshToken);
    tokenService.setCookies(res, newRefreshToken);
    res.status(HttpStatusCode.OK).send({ accessToken: newAccessToken });
  } catch (err) {
    res.status(HttpStatusCode.FORBIDDEN).send({ error: err.message });
  }
};

module.exports = {
  handleCreteRefreshToken,
};
