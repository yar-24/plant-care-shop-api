const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a Title"],
    },
    image: { type: String },
    idImage: { type: String },
    desc: {
      type: String,
      required: [true, "Please add an description"],
    },
    categorie: {
      type: String
    },
    subService:[Object]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
