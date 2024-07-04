const express = require("express");
const cors = require("cors");
const router = express.Router();
const init = (app) => {
  router.get("/", (req, res) => {
    res.send("App is working");
  });

  return app.use("/", router);
};

module.exports = { init };
