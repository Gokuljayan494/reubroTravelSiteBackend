const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

let adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      Math: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "please enter a  valid email id",
      ],

      validate: [validator.isEmail, "please provide a email"],
      unique: true,
      // required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordConfirm: {
      type: String,

      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpires: { type: Date },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

adminSchema.methods.createOtp = async function (next) {
  console.log(`hello`);
  var minm = 100000;
  var maxm = 999999;
  let OTP = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  OTP = OTP.toString();
  console.log(`OTP:${OTP}`);
  this.otp = await bcrypt.hash(OTP, 12);

  console.log(`otp1:${this.otp}`);
  this.otpExpires = Date.now() + 10 * 60 * 1000;
  console.log(this.otpExpires);
  console.log(`otp:${OTP}`);

  return OTP;
};
adminSchema.methods.checkPassword = async function (
  inputtedPassword,
  currentPassword
) {
  console.log(await bcrypt.compare(currentPassword, inputtedPassword));
  return await bcrypt.compare(currentPassword, inputtedPassword.toString());
};
adminSchema.methods.compareOtp = async function () {
  console.log(await bcrypt.compare(currentPassword, inputtedPassword));
  return await bcrypt.compare(currentPassword, inputtedPassword);
};

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  console.log(this.passwordConfirm);
  next();
});

AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;
