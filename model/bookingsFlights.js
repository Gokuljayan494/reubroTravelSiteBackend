const mongooose = require("mongoose");
const User = require("./userModel");
const bookingFlightSchema = new mongooose.Schema(
  {
    // user: {
    //   type: mongooose.Schema.Types.ObjectId,
    //   ref: User,
    //   required: true,
    // },
    user: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    specialRequirements: {
      type: String,
    },
    nameOnCard: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
    },
    flightDetails: {
      type: Array,
      // required,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);
// bookingFlightSchema.plugin(moongoosePagin);
bookingFlightSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});
const BookingFlightModel = mongooose.model(
  "BookingFlight",
  bookingFlightSchema
);

module.exports = BookingFlightModel;
