const express = require("express");
const router = express.Router();
const cors = require("cors");
const userController = require("../controllers/userController");
const { checkToken } = require("../authentication/auth");
// const parser = require("../configs/multer");
const upload = require("../configs/multer");
const init = (app) => {
  router.get("/", (req, res) => {
    res.send("User is working");
  });

  router.post("/login", userController.handleLogin);

  router.post("/register", userController.handleRegister);

  router.post("/logout", userController.handleLogout);

  router.get("/basicInfo/:id", userController.handleGetBasicInfo);

  router.get("/getUser/:id", checkToken, userController.handleGetUser);

  router.post("/forgotPassword", userController.handleForgotPassword);

  router.post("/resetPassword", userController.handleResetPassword);

  router.put(
    "/changePassword",
    checkToken,
    userController.handleChangePassword
  );

  router.put(
    "/updateUser",
    checkToken,
    upload.single("profileImage"),
    userController.handleUpdateUser
  );
  return app.use("/user", router);
};

module.exports = { init };
