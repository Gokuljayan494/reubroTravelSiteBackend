const express = require("express");
const Router = express.Router();
const agentController = require("../controllers/agentController");

Router.route("/normalRegisterAgent").post(agentController.registerAgent);
Router.route("/agentLogin").post(agentController.loginAgent);
// Router.route("/completeRegistration").patch(
//   agentController.uploadImages,
//   agentController.AgentProtect
// );
Router.route("/completeRegistartion").patch(
  agentController.AgentProtect,
  agentController.uploadVideos,
  agentController.CompleteRegistration
);

module.exports = Router;
