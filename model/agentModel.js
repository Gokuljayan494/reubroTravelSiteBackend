const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

let agentSchema = new mongoose.Schema(
  {
    bookings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agentBooking",
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
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    activate: {
      type: Boolean,
      default: false,
      select: true,
    },

    companyName: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    balance: {
      type: Number,
      default: "0",
      required: true,
    },
    mobile: {
      type: Number,
      required: [true, "Agent required a mobile Number"],
    },
    kyc: {
      ownerName: { type: String, required: true },
      dob: { type: String, required: true },

      idProof: {
        type: String,
        required: true,
      },
      tan: {
        type: String,
        required: true,
      },
      licenceNumber: {
        type: String,
        required: true,
      },
    },

    image: {
      type: String,
    },
    subscribe: {
      type: Boolean,
      default: false,
      select: true,
      required: true,
    },
    otp: {
      type: Number,
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
agentSchema.methods.checkPassword = async function (
  inputtedPassword,
  currentPassword
) {
  console.log(await bcrypt.compare(currentPassword, inputtedPassword));
  return await bcrypt.compare(currentPassword, inputtedPassword);
};
agentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

// Embedded documents in MongoDB can be useful when the data is closely related and needs to be accessed frequently together.
// However, it's important to note that embedded documents can increase the size of the document,
// and if the embedded documents become too large it can cause issues with storage and performance.
// To query the data, MongoDB provides specific operators such as $elemMatch and $project to query the embedded documents.

AgentModel = mongoose.model("Agent", agentSchema);
module.exports = AgentModel;
