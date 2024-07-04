const { userService, tokenService } = require("../services/index");
const HttpStatusCode = require("../exceptions/HttpStatusCode");

// Register
const handleRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (firstName === "" || lastName === "" || email === "" || password === "") {
    res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await userService.register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(HttpStatusCode.OK).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

//Login
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send("Email and password must not be empty");
  }

  try {
    let { user, refreshToken } = await userService.login({ email, password });
    tokenService.setCookies(res, refreshToken);
    res.status(HttpStatusCode.OK).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

// Logout
const handleLogout = async (req, res) => {
  tokenService.clearCookies(res);
  res.status(HttpStatusCode.OK).json({
    message: "Logout successful",
  });
};

// Get basic info
const handleGetBasicInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.findUserById(id);
    const firstName = user.firstName;
    const lastName = user.lastName;
    const userImage = user.imagePath;
    res.status(HttpStatusCode.OK).json({
      message: "User found",
      user: {
        firstName,
        lastName,
        userImage,
      },
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

// Get user
const handleGetUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await userService.findUserById(id);
    user = {
      ...user._doc,
      password: "",
    };

    res.status(HttpStatusCode.OK).json({
      message: "User found",
      user,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

// Update user
const handleUpdateUser = async (req, res) => {
  const { firstName, lastName } = req.body;
  const profileImage = req.file;

  try {
    let user = await userService.updateUser({
      id: req.user_id,
      firstName,
      lastName,
      profileImage,
    });
    user = {
      ...user._doc,
      password: "",
    };
    res
      .status(HttpStatusCode.OK)
      .json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

//Forgot password
const handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  if (email === "") {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Email must not be empty",
    });
  }
  try {
    const info = await userService.forgotPassword({ email });
    res.status(HttpStatusCode.OK).json({
      message: "Link update password is already in your email",
      info,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

//Reset Password
const handleResetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (token === "" || password === "") {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Token and password must not be empty",
    });
  }
  try {
    const user = await userService.resetPassword({ token, password });
    res.status(HttpStatusCode.OK).json({
      message: "Password reset successfully",
      user,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

// Change Password
const handleChangePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (oldPassword === "" || newPassword === "") {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Old password and new password must not be empty",
    });
  }
  try {
    const user = await userService.changePassword({
      id: req.user_id,
      oldPassword,
      newPassword,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Password changed successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleGetBasicInfo,
  handleGetUser,
  handleUpdateUser,
  handleForgotPassword,
  handleResetPassword,
  handleChangePassword,
};
