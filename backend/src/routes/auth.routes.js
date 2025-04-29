const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const {authorizeUser} = require("../middlewares/auth.middleware");


const router = Router();

router.get("/me", authorizeUser, authController.getMe);
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);

module.exports = router;