const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const { fileUploads } = require("../../helpers/filehelper");
const { servicePost, serviceUpdate, serviceDelete, serviceGet, serviceGets } = require("../controllers/controllerServices");

router.post("/", protect, [
    body("title"),
    body("desc"),
    body("category"),
    fileUploads.single("image")
], servicePost)

router.put("/:id", protect, [
    body("title"),
    body("desc"),
    body("category"),
    fileUploads.single("image")
], serviceUpdate)

router.delete("/:id", protect, serviceDelete)
router.get("/:id", serviceGet)
router.get("/", serviceGets)

module.exports = router;