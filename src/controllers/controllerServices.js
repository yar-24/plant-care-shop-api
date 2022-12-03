const cloudinary = require("../middleware/cloudinaryMiddleware");
const asyncHandler = require("express-async-handler");
const Service = require("../models/modelServices");

// @desc    Post Service
// @route   POST /v2/services
// @access  Private
const servicePost = asyncHandler(async (req, res) => {
  if (!req.file) {
    const err = new Error("Gambar harus diupload!!");
    err.errorStatus = 422;
    throw err;
  } else {
    try {
      const cloudUpload = await cloudinary.uploader.upload;
      const image = await cloudUpload(req.file.path);

      const service = await Service.create({
        user: req.user.id,
        title: req.body.title,
        desc: req.body.desc,
        category: req.body.category,
        idImage: image.public_id,
      });
      res.status(201).json({ messsage: "Berhasil diinput", service: service });
    } catch (error) {
      res.status(400).send(error.message);
      throw new Error("Invalid user data");
    }
  }
});

// @desc    Put Service
// @route   PUT /v2/services/:id
// @access  Private
const serviceUpdate = asyncHandler(async (req, res) => {
  const id = req.params.id;
    try {
      let service = await Service.findById(req.params.id);

      //DELETE FILE
      const cloudDelete = await cloudinary.uploader.destroy;
      cloudDelete(service.idImage);
    
      //POST FILE
      const cloudUpload = await cloudinary.uploader.upload;
        const image = await cloudUpload(req.file.path);

      const data = {
        title: req.body.title || service.title,
        desc: req.body.desc || service.desc,
        category: req.body.category || service.category,
        idImage: image.public_id || service.idImage,
      };

      service = await Service.findByIdAndUpdate(id, data, { new: true });
      res.json({ message: "Berhasil diupdate", data });
    } catch (err) {
      res.status(400).send(err.message);
      throw new Error("Invalid user data");
    }
});

// @desc    Delete Service
// @route   DELETE /v2/services/:id
// @access  Private
const serviceDelete = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    try {
      let service = await Service.findById(req.params.id);
  
      const cloudDelete = await cloudinary.uploader.destroy;
      cloudDelete(service.idImage);

      service = await Service.findByIdAndRemove(id);
      res.json({ message: "Berhasil dihapus" });
    } catch (error) {
      res.status(400).send(err.message);
      throw new Error("Invalid user data");
    }
  });

// @desc    Get Service
// @route   GET /v2/services/:id
const serviceGet = asyncHandler(async (req, res) => {
    const id = req.params.id;
  
    let service = await Service.findById(id);
  
    if (service) {
      res.status(200).json({
        message: "Berhasil dipanggil",
        service: service,
      });
    } else {
      res.status(400).send(err.message);
      throw new Error("Invalid credentials");
    }
  });
  
// @desc    Get all Services
// @route   GET /v2/services
const serviceGets = asyncHandler(async (req, res) => {
  const services = await Service.find();

    try {
      res.status(200).json({
        message: "Berhasil dipanggil",
        services: services,
      });
    } catch (error) {
      res.status(400).send(err.message);
      throw new Error("Invalid credentials");
    }
  });


module.exports = { servicePost, serviceUpdate, serviceDelete, serviceGet, serviceGets };
