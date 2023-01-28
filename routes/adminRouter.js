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
  .get(authController.protect, adminController.getBookingDetail);
router
  .route("/deleteBookings/:id")
  .delete(authController.protect, adminController.deleteBookings);
router.patch("/forgotPassword", adminController.forgotPassword);
router.patch("/resetPassword", adminController.resetPassword);
router
  .route("/flightBookingDetails")
  .get(authController.protect, adminController.getALLFlightBookings);
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
  .route("/activateAgency/:id")
  .patch(authController.protect, adminController.activateAgents);

router
  .route("/addAgentBalance/:id")
  .patch(authController.protect, adminController.addAgentCreditBalance);
module.exports = router;
