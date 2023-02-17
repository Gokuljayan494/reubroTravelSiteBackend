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
  );
router
  .route("/myProfile")
  .get(userController.protect, userController.myProfile)
  .get(userController.protect, userController.myProfile);
router
  .route("/bookFlight")
  .post(userController.protect, userController.userBookFlight);
router
  .route("/userBookings")
  .get(userController.protect, userController.userBookings);
router.route("/forgotPassword").post(userController.forgotPassword);
router.route("/resetPassword/:email").patch(userController.resetPassword);
router
  .route("/changePassword")
  .patch(userController.protect, userController.changePassword);
module.exports = router;
