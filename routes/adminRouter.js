const express = require("express");
const authController = require("../controllers/authenication");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const protect = require("../controllers/authenication");
const router = express.Router();
router.post("/register", adminController.addAdmin);
router.post("/login", adminController.login);
router.get("/allUsers", adminController.getAllUsers);

router.patch("/forgotPassword", adminController.forgotPassword);
router.patch("/resetPassword", adminController.resetPassword);
router
  .route("/flightBookingDetails")
  .get(authController.protect, adminController.getALLFlightBookings);
router.post(
  "/uploadVideo",
  adminController.uploadVideos,
  adminController.videos
);

router.route("/getVideo").get(adminController.viewVideos);
router
  .route("/dashboard")
  .get(authController.protect, adminController.dashboard);
module.exports = router;
