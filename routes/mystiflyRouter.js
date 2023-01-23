const express = require("express");

const router = express.Router();

const mystiflyController = require("../controllers/mystiflyController");
router.get("/searchFlights", mystiflyController.mystiflyApiSearch);

module.exports = router;
