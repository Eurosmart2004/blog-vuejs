const express = require("express");
const { checkToken } = require("../authentication/auth");
const router = express.Router();
const reactController = require("../controllers/reactController");

const init = (app) => {
  router.get("/", (req, res) => {
    console.log(req.headers);
    res.send("React is working");
  });

  router.get("/getAll", reactController.handleGetAll);
  router.get("/getReact", checkToken, reactController.handleGetReact);
  router.post("/addReact", checkToken, reactController.handleAddReact);

  return app.use("/react", router);
};

module.exports = { init };
