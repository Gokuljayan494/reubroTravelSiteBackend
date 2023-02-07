const express = require("express");

const router = express.Router();

const mystiflyController = require("../controllers/mystiflyController");
router.post("/searchFlights", mystiflyController.mystiflyApiSearch);
router.post(
  "/flightFareRules/:fareSourceCode",
  mystiflyController.flightFaresRules
);
router.post(
  "/revalidateFlights/:fareSourceCode",
  mystiflyController.revalidateFlights
);

router.route("/bookFlight/:number").post(mystiflyController.bookFlight);
router.route("/orderFlight").post(mystiflyController.OrderTicket);
router.route("/bookingNotes").get(mystiflyController.BookingNotes);
router.route("/retriveMFRef").get(mystiflyController.mref);

module.exports = router;
