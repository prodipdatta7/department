const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  login,
  deleteUser,
  getUserByEmail,
} = require("../routeHandlers/userController");

const router = express.Router();

router.get("/get-users", getUsers);
router.post("/register", createUser);
router.get("/get-user/:id", getUserById);
router.put("/update/:id", updateUser);
router.post("/login", login);
router.delete("/remove/:id", deleteUser);
router.post("/get-by-email", getUserByEmail);

module.exports = router;
