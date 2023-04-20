const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  customerId: {
    type: String,
    default: "",
  },
  credits: {
    type: Number,
    default: 5,
  },
  subscription: {
    type: String,
    default: "",
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpires: {
    type: String,
    default: "",
  },
});

//hash password before saving to database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match passwords
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//set reset password token
UserSchema.methods.resetPasswordTokenFunction = async function () {
  const salt = await bcrypt.genSalt(10);
  const token = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(token, salt);
  //   resetToken = generateCode();
  this.resetPasswordToken = hash;
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await this.save();
  let resetLink = `http://localhost:3000/reset-password/${encodeURIComponent(hash)}`;
  sendEmail(
    this.email,
    "Password Reset",
    `<b>Hello world?</b><div><p>Your Reset Code! </p><p>This code is valid for 1 hour. 
    <a href="${resetLink}">${resetLink}</a>
    </p></div>`
  );
};

UserSchema.methods.updatePassword = async function (password) {
  this.password = password;
  this.resetPasswordToken = "";
  this.resetPasswordExpires = "";
  // console.log("User Updated");
  await this.save();
};

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function (res) {
  const accessToken = jwt.sign({ id: this._id }, process.env.APPSETTING_JWT_ACCESS_SECRET, {
    expiresIn: process.env.APPSETTING_JWT_ACCESS_EXPIRE,
  });
  const refreshToken = jwt.sign({ id: this._id }, process.env.APPSETTING_JWT_REFRESH_SECRET, {
    expiresIn: process.env.APPSETTING_JWT_REFRESH_EXPIRE,
  });
  res.cookie("refreshToken", `${refreshToken}`, { maxAge: 86400 * 7000, httpOnly: true });
  return { accessToken, refreshToken };
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
