const asyncHandler = require("express-async-handler");
const User = require("../models/modelUsers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

// @desc    Post user data
// @route   POST /v2/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname|| !email || !password) {
    res.status(422);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(422);
    throw new Error("Email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      message: "Register Success",
      user: {
        _id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /v2/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: "Login Success",
      _id: user.id,
      name: user.name,
      email: user.email,
      picProfile: user.picProfile,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    forgot password a user
// @route   POST /v2/users/forgotPassword
// @access  Public
const forgotPasswordUser = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });

    if (userData) {
      const randomString = randomstring.generate();
      const data = await User.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );
      sendResetPasswordMail(userData.name, userData.email, randomString);
      res.status(200).send({
        success: true,
        message: "Silahkan Cek email Anda",
      });
    } else {
      res.status(200).send({ success: true, message: "Email tidak ditemukan" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// @desc    reset password a user
// @route   POST /v2/users/resetPassword
// @access  Public
const resetPasswordUser = asyncHandler(async (req, res) => {
  const {password} = req.body
  try {
    const token = req.query.token;
    const tokenData = await User.findOne({ token: token });
    if (tokenData) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userData = await User.findByIdAndUpdate({_id:tokenData._id},{$set:{password: hashedPassword, token: ""}}, {new: true});
      res
        .status(200)
        .send({
          success: true,
          message: "Password user telah direset",
          data: userData,
        });
    } else {
      res
        .status(200)
        .send({ success: false, message: "this link has been expired" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// @desc    Send email to user
// @access  Private
const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.NAME_EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    });

    const mailOption = {
      from: process.env.NAME_EMAIL,
      to: email,
      subject: "For Reset Password",
      html:
        "<p> hai " +
        name +
        ', Please copy or click the <a href="http://localhost:3000/reset-password?token=' +
        token +
        '">link</a> and reset your password</p> ',
    };
    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Check your email", info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

// @desc    delete user data
// @route   DELETE /v2/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    let user = await User.findById(id);

    await user.remove();
    res.status(200).json({
      message: "User berhasil dihapus",
      user: user
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @desc    Get user data
// @route   GET /v2/users/:id
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const id = req.params.id;

  let user = await User.findById(id);

  if (user) {
    res.status(200).json({
      message: "Berhasil dipanggil",
      user: {
        _id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: generateToken(user._id),
      }
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};



module.exports = {
  registerUser,
  loginUser,
  resetPasswordUser,
  forgotPasswordUser,
  deleteUser,
  getMe
};
