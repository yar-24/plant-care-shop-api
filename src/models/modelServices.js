const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
    category: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
