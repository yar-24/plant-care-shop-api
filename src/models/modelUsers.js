const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please add a firstname'],
    },
    lastname: {
      type: String,
      required: [true, 'Please add a lastname'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    carts:[Object],
    address:{type: String},
    token:{
      type:String,
      default:''
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)