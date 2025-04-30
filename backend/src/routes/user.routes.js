const { Router } = require("express");
const userController = require("../controllers/user.controller");
const {authorizeUser} = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", authorizeUser, userController.getUser);
router.put("/", authorizeUser, userController.updateUser);
router.delete("/", authorizeUser, userController.deleteUser);
router.get("/all", authorizeUser, userController.getAllUsers);

module.exports = router;