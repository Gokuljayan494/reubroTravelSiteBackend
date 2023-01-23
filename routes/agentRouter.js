const express = require("express");
const Router = express.Router();
const agentController = require("../controllers/agentController");

Router.route("/normalRegisterAgent").post(agentController.registerAgent);

module.exports = Router;
