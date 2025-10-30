const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/", usersController.getUsers);
router.get("/:userId", usersController.getUserById);
router.post("/", usersController.createUser);
router.patch("/me", usersController.updateProfile);
router.patch("/me/avatar", usersController.updateAvatar);

module.exports = router;
