const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  resetPasswordUser,
  forgotPasswordUser,
  deleteUser,
  getMe,
  updateUser
} = require("../controllers/controllerUsers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resetPassword", resetPasswordUser);
router.post("/forgotPassword", forgotPasswordUser);
router.delete("/:id", protect, deleteUser);
router.get("/:id", protect, getMe);
router.put("/:id", protect, updateUser);

module.exports = router;
