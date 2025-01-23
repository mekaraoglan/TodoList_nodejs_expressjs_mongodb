const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/index");

router.get("/", userControllers.index);

module.exports = router;