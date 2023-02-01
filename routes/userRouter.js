const express = require("express");

const userController = require("../controllers/userController");
const router = express.Router();
router
  .route("/registerUser")
  .post(userController.uploadAdsMulter, userController.uploadAds);
router.route("/loginUser").post(userController.userLogin);
router
  .route("/editMe")
  .patch(
    userController.protect,
    userController.uploadAdsMulter,
    userController.editUser
  )
  .get(userController.protect, userController.myProfile);
router
  .route("/bookFlight")
  .post(userController.protect, userController.bookingsFlight);
router.route("/bookings");
router.route("/forgotPassword").post(userController.forgotPassword);

router.route("/resetPassword/:email").patch(userController.resetPassword);

module.exports = router;
