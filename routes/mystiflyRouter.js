const express = require("express");

const router = express.Router();

const mystiflyController = require("../controllers/mystiflyController");
router.post("/searchFlights", mystiflyController.mystiflyApiSearch);

module.exports = router;
