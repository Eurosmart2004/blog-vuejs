const express = require("express");
const router = express.Router();
const cors = require("cors");
const tokenController = require("../controllers/tokenController");

const init = (app) => {
  router.get("/", (req, res) => {
    res.send("token is working");
  });

  router.get("/refreshToken", tokenController.handleCreteRefreshToken);

  return app.use("/token", router);
};

module.exports = { init };
