const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createNewAccessRefreshToken = async (refreshToken) => {
  try {
    // Verify and decode the old token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const payload = {
      _id: decoded._id,
      email: decoded.email,
    };
    const newAccessToken = await createToken(
      payload,
      process.env.JWT_SECRET,
      "2m"
    );
    const newRefreshToken = await createToken(
      payload,
      process.env.JWT_REFRESH_SECRET,
      "1d"
    );
    return { newAccessToken, newRefreshToken };
  } catch (error) {
    throw error;
  }
};

const createToken = async (
  payload,
  key = process.env.JWT_SECRET,
  expiresIn = "2m"
) => {
  return jwt.sign(payload, key, {
    expiresIn,
  });
};

const setCookies = (res, refreshToken) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    expires,
  });
};

const clearCookies = (res) => {
  res.cookie("refreshToken", "", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    expires: new Date(0),
  });
};

module.exports = {
  createNewAccessRefreshToken,
  setCookies,
  clearCookies,
  createToken,
};
