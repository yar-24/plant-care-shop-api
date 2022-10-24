const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    namePlant: {
      type: String,
      required: [true, "Please add a name plant"],
    },
    plantHeight: [Object],
    conditions: {
      type: String,
      require: [true, "Please add a conditions"],
    },
    care: {
      type: String,
      require: [true, "Please add a care"],
    },
    price: {
      type: Number,
      require: [true, "Please add a price"],
    },
    idImageProduct: { type: String },
    // imageProduct: {
    //   type: String,
    //   require: [true, "Please add a imageProduct"],
    // },
    plantAbout: {
      type: String,
      require: [true, "Please add a plant about"],
    },
    images: [Object],
    plantLike: [Object],
    plantTipe: { type: String },
    plantEnvironment: {type: String},
    plantLight: { type: String },
    plantBenefit: { type: String },
    productTipe: { type: String },
    sale: [Object ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
