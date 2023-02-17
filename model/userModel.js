const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Booking = require("./userBookingsFlights");
const mongoosePaginate = require("mongoose-paginate-v2");
const { default: isEmail } = require("validator/lib/isEmail");
const BookingFlight = require("../model/userBookingsFlights");

// const { softDeletePlugin } = require("soft-delete-plugin-mongoose");

let userSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookingFlight",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      Math: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "please enter a  valid email id",
      ],
      validate: [validator.isEmail, "please provide a email"],
      unique: [true, "email used before"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    place: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    mobile: {
      type: Number,
      // required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
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

userSchema.methods.createOtp = async function (next) {
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
userSchema.methods.compareOtp = async function () {
  console.log(await bcrypt.compare(currentPassword, inputtedPassword));
  return await bcrypt.compare(currentPassword, inputtedPassword);
};
userSchema.methods.checkPassword = async function (
  inputtedPassword,
  currentPassword
) {
  console.log(await bcrypt.compare(currentPassword, inputtedPassword));
  return await bcrypt.compare(currentPassword, inputtedPassword);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
