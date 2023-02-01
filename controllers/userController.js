// let AdsModel = require("../model/adsModel");
const userModel = require("../model/userModel");
const multer = require("multer");
const boookingFlightModel = require("../model/bookingsFlights");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const sgMail = require("@sendgrid/mail");
const sendRegisterEmail = require("../utils/emailSendGrid");
const sendEmail = require("../controllers/email");

////////////////////////////////////////////
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.protect = async (req, res, next) => {
  try {
    // check if the token is in headers
    console.log(req.headers.authorization.startsWith("Bearer"));
    if (!req.headers.authorization.startsWith("Bearer")) {
      throw new Error("sign in first");
    }
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("no token");
    }
    decoded = jwt.verify(token, process.env.jwtSecretKeyUser);
    if (!token) {
      throw new Error("invalid token ");
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

let jwtToken = async (id) => {
  token = jwt.sign({ id }, process.env.jwtSecretKeyUser, {
    expiresIn: `1d`,
  });
  return token;
};
cloudinary.config({
  cloud_name: "ddvontprj",
  api_key: "651867513143989",
  api_secret: "nRV4E2rXZ4Eg9j-SqjUuAejgYR0",
});
let cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  folder: "travelSite",
  allowedFormats: ["jpg", "png", "jpeg", "gid", "pdf", "mp4"],
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // The file on cloudinary would have the same name as the original file name
  },
});

var upload = multer({
  storage: cloudinaryStorage,
});

exports.uploadAdsMulter = upload.single("image");

exports.uploadAds = async (req, res) => {
  try {
    console.log(`------`);
    console.log(`------`);
    console.log(`------`);
    // console.log(image);
    console.log(`mime:${req.file.mimetype}`);
    let mime = req.file.mimetype.split("/")[1];
    if (mime === "jpeg" || mime === "png") {
    }
    console.log(mime);
    const {
      name,
      email,
      password,
      place,
      pincode,
      state,
      city,
      country,
      mobile,
    } = req.body;

    let images = req.file.path;

    let user = await userModel.create({
      name,
      email,
      password,
      place,
      pincode,
      state,
      city,
      country,
      mobile,
      image: images,
    });
    console.log(process.env.SENDGRID_API_KEY);
    if (!user) {
      throw new Error("please enter the required fields");
    }

    await sendRegisterEmail(user.email);

    // console.log(ads);
    res.status(200).json({ status: "sucess", user });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // console.log(await userModel.find());
    user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      throw "input the fields";
    }
    if (!(await user.checkPassword(user.password, password))) {
      throw new Error("incorrect credentials");
    }

    token = await jwtToken(user._id);
    console.log(token);

    res.status(200).json({ status: "sucess", user, token });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

///////////////////////////////////
exports.editUser = async (req, res) => {
  try {
    id = req.user;
    let images = req.file.path;

    let { name, email, place, mobile } = req.body;
    console.log(req.body);
    user = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      place,
      image: images,
      mobile,
    });
    console.log(user);

    res.status(200).json({ status: "sucess", user });
  } catch (err) {
    res.status(200).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.myProfile = async (req, res) => {
  try {
    id = req.user;
    user = await userModel.findById(id);
    res.status(200).json({ status: "sucess", user });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.bookingsFlight = async (req, res) => {
  try {
    user = req.user;
    const {
      specialRequirements,
      nameOnCard,
      cardNumber,
      expirationDate,
      flightDetails,
    } = req.body;
    bookingFlight = await boookingFlightModel.create({
      user,
      specialRequirements,
      nameOnCard,
      cardNumber,
      expirationDate,
      flightDetails,
    });
    res.status(200).json({ status: "sucess", bookingFlight });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
exports.getFlightBookingDetails = async (req, res) => {
  try {
    res.status(200).json({ status: "sucess", bookingFlight });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("invalid user");
    }

    otp = await user.createOtp();

    user.save({ validateBeforeSave: false });
    console.log(user);
    let message = `

        <h1>Hello!</h1>\n<div>This is your OTP FOR admin reset password. \n <h3> ${otp}</h3>. \n Regards \nTravel site</div>`;
    user = await sendEmail({
      email: user.email,
      subject: `your password reset otp`,
      message,
    });
    res.status(200).json({
      status: "sucess",
      message: `Otp has sent to mail `,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    console.log(`hey`);
    let { otp, password, passwordConfirm } = req.body;
    if (!otp || !password || !passwordConfirm) {
      throw new Error("input fields correctly");
    }
    const email = req.params.email;
    console.log(`----`);

    // find the account and compare with the entered otp and save otp in database

    user = await userModel.findOne({ email }).select("+otp");
    console.log(user);
    console.log(user.otp);
    // admin.compareOtp(admin.otp, otp);
    if (!user && !(await user.compareOtp(user.otp, otp))) {
      throw new Error("invalid otp or invalid user");
    }

    console.log(user);
    otp = user.otp;
    console.log(otp);
    // user = await userModel.findOne({
    //   otp,
    //   otpExpires: { $gte: Date.now() },
    // });
    if (!user) {
      throw new Error("invalid otp ");
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.save({ validateBeforeSave: false });

    res.status(200).json({ status: "sucess", message: "password resetted" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.userBookings = async (req, res) => {
  try {
    id = req.user;
    bookings = await boookingFlightModel.find({ user: id }).populate("user");
    res.status(200).json({ status: "sucess", bookings });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
