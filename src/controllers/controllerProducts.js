const Product = require("../models/modelProducts");
const cloudinary = require("../middleware/cloudinaryMiddleware");
const asyncHandler = require("express-async-handler");

// @desc    Post product
// @route   POST /v2/product
// @access  Private
const productPost = asyncHandler(async (req, res) => {
  if (!req.files) {
    const err = new Error("Gambar harus diupload!!");
    err.errorStatus = 422;
    throw err;
  } else {
    try {
      const cloudUpload = await cloudinary.uploader.upload;
      const imageProduct = await cloudUpload(req.files["imageProduct"][0].path);
      let imagesArray = [];

      for (var i = 0; i < req.files["images"].length; i++) {
        var locaFilePath = req.files["images"][i].path;
        var result = await cloudUpload(locaFilePath);
        imagesArray.push({ image_id: result.public_id });
      }

      const plantHeight = {
        centimeters: req.body.centimeters,
      };

      const plantLike = {
        titleLike: req.body.titleLike,
        descLike: req.body.descLike,
      };

      const sale = {
        idProduct: req.body.idProduct,
      };

      const product = await Product.create({
        user: req.user.id,
        namePlant: req.body.namePlant,
        conditions: req.body.conditions,
        care: req.body.care,
        price: req.body.price,
        plantAbout: req.body.plantAbout,
        // imageProduct: imageProduct.secure_url,
        idImageProduct: imageProduct.public_id,
        images: imagesArray,
        plantHeight: plantHeight,
        plantLike: plantLike,
        plantTipe: req.body.plantTipe,
        plantEnvironment: req.body.plantEnvironment,
        plantLight: req.body.plantLight,
        plantBenefit: req.body.plantBenefit,
        productTipe: req.body.productTipe,
        sale: sale,
      });
      res.status(200).json({ messsage: "Berhasil diinput", product: product });
    } catch (error) {
      res.status(400).send(error.message);
      throw new Error("Invalid user data");
    }
  }
});

// @desc    Put product
// @route   PUT /v2/produts/:id
// @access  Private
const productUpdate = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!req.files) {
    const err = new Error("Gambar harus diupload!!");
    err.errorStatus = 422;
    throw err;
  } else {
    try {
      let product = await Product.findById(req.params.id);

      //DELETE FILE
      const cloudDelete = await cloudinary.uploader.destroy;
      cloudDelete(product.idImageProduct);
      product.images.map((image) => {
        const hapus = image.image_id;
        cloudDelete(hapus);
      });

      //POST FILE
      const cloudUpload = await cloudinary.uploader.upload;
      const imageProduct = await cloudUpload(req.files["imageProduct"][0].path);
      let imagesArray = [];

      for (var i = 0; i < req.files["images"].length; i++) {
        var locaFilePath = req.files["images"][i].path;
        var result = await cloudUpload(locaFilePath);
        imagesArray.push({ url: result.url, image_id: result.public_id });
      }

      const plantHeight = {
        centimeters: req.body.centimeters,
      };

      const plantLike = {
        titleLike: req.body.titleLike,
        descLike: req.body.descLike,
      };

      const sale = {
        idProduct: req.body.idProduct,
      };

      const data = {
        namePlant: req.body.namePlant || product.namePlant,
        conditions: req.body.conditions || product.conditions,
        care: req.body.care || product.care,
        price: req.body.price || product.price,
        plantAbout: req.body.plantAbout || product.plantAbout,
        // imageProduct: imageProduct.secure_url || product.imageProduct,
        idImageProduct: imageProduct.public_id || product.idImageProduct,
        images: imagesArray || product.images,
        plantHeight: plantHeight || product.plantHeight,
        plantLike: plantLike || product.plantLike,
        plantTipe: req.body.plantTipe || product.plantTipe,
        plantEnvironment: req.body.plantEnvironment || product.plantEnvironment,
        plantLight: req.body.plantLight || product.plantLight,
        plantBenefit: req.body.plantBenefit || product.plantBenefit,
        productTipe: req.body.productTipe || product.productTipe,
        sale: sale || product.sale,
      };

      product = await Product.findByIdAndUpdate(id, data, { new: true });
      res.json({ message: "Berhasil diupdate", data });
    } catch (err) {
      res.status(400).send(err.message);
      throw new Error("Invalid user data");
    }
  }
});

// @desc    Delete product
// @route   DELETE /v2/produts/:id
// @access  Private
const productDelete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    let product = await Product.findById(req.params.id);

    const cloudDelete = await cloudinary.uploader.destroy;
    cloudDelete(product.idImageProduct);
    product.images.map((image) => {
      const hapus = image.image_id;
      cloudDelete(hapus);
    });
    product = await Product.findByIdAndRemove(id);
    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    res.status(400).send(err.message);
    throw new Error("Invalid user data");
  }
});

// @desc    Get product
// @route   GET /v2/products/:id
const productGet = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let product = await Product.findById(id);

  if (product) {
    res.status(200).json({
      message: "Berhasil dipanggil",
      product: product,
    });
  } else {
    res.status(400).send(err.message);
    throw new Error("Invalid credentials");
  }
});


// @desc    Get products
// @route   GET /v2/products/
const productGets = asyncHandler(async (req, res) => {
  const products = await Product.find();
  try {
    res.status(200).json({
      message: "Berhasil dipanggil",
      products: products,
    });
  } catch (error) {
    res.status(400).send(err.message);
    throw new Error("Invalid credentials");
  }
});

module.exports = {
  productPost,
  productUpdate,
  productDelete,
  productGet,
  productGets,
};
