const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/", usersController.usersList);
router.post("/", usersController.insertUser);
router.get("/:id", usersController.getUser);
router.delete("/:id", usersController.deleteUser);
router.patch("/:id", usersController.updateUser);

module.exports = router;