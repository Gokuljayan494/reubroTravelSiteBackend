const express = require("express");
const Router = express.Router();
const agentController = require("../controllers/agentController");

Router.route("/normalRegisterAgent").post(agentController.registerAgent);
Router.route("/agentLogin").post(agentController.loginAgent);

Router.route("/completeRegistartion").patch(
  agentController.AgentProtect,
  agentController.uploadVideos,
  agentController.CompleteRegistration
);
Router.route("/agentProfile").get(
  agentController.AgentProtect,
  agentController.agentProfile
);

Router.route("/editProfile").patch(
  agentController.AgentProtect,
  agentController.uploadVideos,
  agentController.editAgent
);
Router.route("/checkCreditBalance").get(
  agentController.AgentProtect,
  agentController.checkCreditBalance
);
Router.route("/bookTicketAgent").post(
  agentController.AgentProtect,
  agentController.agentBookTicket
);
Router.route("/agentBookings").get(
  agentController.AgentProtect,
  agentController.agentsBookings
);
Router.route("/changePassword").patch(
  agentController.AgentProtect,
  agentController.changePassword
);
module.exports = Router;
