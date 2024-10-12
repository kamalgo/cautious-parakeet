const express = require("express");
const router = express.Router();

const {getAllFreshStudForPageLoad} = require("../controllers/freshStudController");

router.post("/getAllFreshStudForPageLoad", getAllFreshStudForPageLoad);

module.exports = router;
