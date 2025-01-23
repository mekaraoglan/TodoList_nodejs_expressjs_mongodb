const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkAuth = require("../middlewares/checkAuth");

router.get("/account", checkAuth, userController.get_profile);
router.get("/profile-edit", checkAuth, userController.get_profile_edit);
router.post("/profile-edit/", checkAuth, userController.put_profile_edit);
router.get("/reset-password", checkAuth, userController.get_reset_password);
router.post("/reset-password", checkAuth, userController.put_reset_password);

module.exports = router;