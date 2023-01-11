const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Booking = require("./bookingsFlights");
const mongoosePaginate = require("mongoose-paginate-v2");

let userSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
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
    place: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

userSchema.methods.checkPassword = async function (
  inputtedPassword,
  currentPassword
) {
  console.log(await bcrypt.compare(currentPassword, inputtedPassword));
  return await bcrypt.compare(currentPassword, inputtedPassword);
};
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
});
userSchema.plugin(mongoosePaginate);

UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
