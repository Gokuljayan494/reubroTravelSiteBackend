const express = require("express");
const authController = require("../controllers/authenication");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const protect = require("../controllers/authenication");
const router = express.Router();
router.post("/register", adminController.addAdmin);
router.post("/login", adminController.login);
router.get("/allUsers", authController.protect, adminController.getAllUsers);
router.get("/viewUser/:id", authController.protect, adminController.getUser);
router.delete(
  "/deleteUser/:userId",
  authController.protect,
  adminController.deleteUser
);

router
  .route("/userFlightBookingDetails/:userId")
  .get(authController.protect, adminController.getuserBookingDetail);

router
  .route("/deleteBookings/:id")
  .delete(authController.protect, adminController.deleteBookings);

router.post("/forgotPassword", adminController.forgotPassword);

router.patch("/resetPassword/:email", adminController.resetPassword);

router
  .route("/flightBookingDetails")
  .get(authController.protect, adminController.getALLUserFlightBookings);

router.post(
  "/uploadVideo",
  authController.protect,
  adminController.uploadVideos,
  adminController.videos
);

router
  .route("/getVideo")
  .get(authController.protect, adminController.viewVideos);

router
  .route("/dashboard")
  .get(authController.protect, adminController.dashboard);

router
  .route("/totalRegisteredAgents")
  .get(authController.protect, adminController.registeredAgents);

router
  .route("/activateAgency/:id")
  .delete(authController.protect, adminController.activateAgents);

router
  .route("/addAgentBalance/:id")
  .patch(authController.protect, adminController.addAgentCreditBalance);

router
  .route("/editAdmin")
  .patch(authController.protect, adminController.editProfile);

router
  .route("/getActivatedAgents")
  .get(authController.protect, adminController.getActivatedAgents);

router
  .route("/viewAgent/:id")
  .get(authController.protect, adminController.viewAgent);

router
  .route("/deleteAgent/:id")
  .delete(authController.protect, adminController.deleteAgent);
router
  .route("/changePassword")
  .patch(authController.protect, adminController.changePassword);
module.exports = router;
