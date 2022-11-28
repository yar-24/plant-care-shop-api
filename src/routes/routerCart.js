const express = require("express");
const { createCart, putCart, deleteCart, getCart, getsCart } = require("../controllers/controllerCart");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createCart)
router.put("/:id", protect, putCart)
router.delete("/:id", protect, deleteCart)
router.get("/find/:userId", protect, getCart)
router.get("/", protect, getsCart)

module.exports = router;