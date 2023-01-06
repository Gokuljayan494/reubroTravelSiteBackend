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
module.exports = router;
