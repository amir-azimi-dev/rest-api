const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/session");

router.get("/new", sessionController.newSession);

module.exports = router;