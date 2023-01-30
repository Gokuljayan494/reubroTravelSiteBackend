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

module.exports = router;
