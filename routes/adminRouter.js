const express = require("express");
const authController = require("../controllers/authenication");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const protect = require("../controllers/authenication");
const router = express.Router();
router.post("/register", adminController.addAdmin);
router.post("/login", adminController.login);
router.get("/allUsers", authController.protect, adminController.getAllUsers);
router.patch("/forgotPassword", adminController.forgotPassword);
router.patch("/resetPassword", adminController.resetPassword);
router
  .route("/flightBookingDetails")
  .get(authController.protect, adminController.getALLFlightBookings);
// .patch(authController.protect, userController.editUser);
module.exports = router;
