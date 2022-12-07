const express = require("express");
const { productPost, productUpdate, productDelete, productGet, productGets } = require("../controllers/controllerProducts");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const { fileUploads } = require("../../helpers/filehelper");

router.post(
  "/", protect,
  [
    body("namePlant"),
    body("conditions"),
    body("plantSize"),
    body("care"),
    body("price"),
    body("plantAbout"),
    body("plantTipe"),
    body("plantEnvironment"),
    body("plantLight"),
    body("plantBenefit"),
    body("productTipe"),
    body("centimeters"),
    body("plantLike"),
    body("sale"),
    fileUploads.fields([
        {name: "imageProduct"},
        {name: "images"},
    ])
  ],
  productPost
);

router.put(
  "/:id", protect,
  [
    body("namePlant"),
    body("conditions"),
    body("plantSize"),
    body("care"),
    body("price"),
    body("plantAbout"),
    body("plantTipe"),
    body("plantEnvironment"),
    body("plantLight"),
    body("plantBenefit"),
    body("productTipe"),
    body("centimeters"),
    body("plantLike"),
    body("sale"),
    fileUploads.fields([
        {name: "imageProduct"},
        {name: "images"},
    ])
  ],
  productUpdate
);

router.delete("/:id", protect, productDelete)

router.get("/:id", productGet)
router.get("/", productGets)

module.exports = router;
