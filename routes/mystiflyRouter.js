const express = require("express");

const router = express.Router();

const mystiflyController = require("../controllers/mystiflyController");
router.post("/searchFlights", mystiflyController.mystiflyApiSearch);
router.post("/revalidateFlights", mystiflyController.revalidateFlights);

module.exports = router;
