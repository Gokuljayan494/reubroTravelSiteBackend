const AdminModel = require("../model/adminModel");
const userModel = require("../model/userModel");
const sendEmail = require("../controllers/email");
const path = require("path");
const multer = require("multer");
const VideoModel = require("../model/videoUploadModel");
const formidable = require("formidable");
const fs = require("fs");
const FlightBookingModel = require("../model/bookingsFlights");
const jwt = require("jsonwebtoken");
const { getVideoDuration } = require("get-video-duration");
const BookingFlightModel = require("../model/bookingsFlights");
//////////////////////////////////////////

let jwtToken = async (id) => {
  token = jwt.sign({ id }, process.env.jwtSecretKeyAdmin, {
    expiresIn: `1d`,
  });
  return token;
};
exports.addAdmin = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    admin = await AdminModel.create({ name, email, password, passwordConfirm });

    console.log(admin);
    res.status(200).json({ status: "sucess", admin });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    admin = await AdminModel.findOne({ email }).select("+password");
    console.log(admin);
    console.log(`email:${email},password:${password}`);
    if (!admin) {
      throw new Error("no admin found");
    }
    // admin.cPassword(admin.password, password);

    if (!(await admin.checkPassword(admin.password, password))) {
      throw new Error("incorrect credentials");
    }
    token = await jwtToken(admin._id);
    console.log(token);
    res.status(200).json({ status: "sucess", data: { admin }, token });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 5;
    // const skip = (page - 1) * limit;

    users = await userModel.find();

    // console.log(page, limit, offset);
    // data = await userModel.find();
    // data = await userModel.paginate({ page, limit, offset });
    res
      .status(200)
      .json({ status: "sucess", results: users.length, data: { users } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    admin = await AdminModel.findOne({ email }).select("+password");
    let otp = admin.createOtp();
    console.log(otp);
    admin.save({ validateBeforeSave: false });
    console.log(admin);
    let message = `

        <h1>Hello!</h1>\n<div>This is your OTP FOR admin reset password. \n <h3> ${otp}</h3>. \n Regards \nTravel site</div>`;
    admin = await sendEmail({
      email: admin.email,
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
    const { otp, password, passwordConfirm } = req.body;
    admin = await AdminModel.findOne({ otp, otpExpires: { $gte: Date.now() } });
    if (!admin) {
      throw new Error("invalid otp ");
    }
    admin.password = password;
    admin.passwordConfirm = passwordConfirm;
    admin.save({ validateBeforeSave: false });

    res.status(200).json({ status: "sucess", message: "password resetted" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    id = req.params.userId;
    await userModel.findByIdAndUpdate({ id }, { active: false });
    res.status(200).json({ status: "sucess", message: "user deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.getALLFlightBookings = async (req, res) => {
  try {
    flightBookings = await FlightBookingModel.find();

    res.status(200).json({ status: "sucess", flightBookings });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

const multerFilter = (req, file, cb) => {
  console.log(file.mimetype.split("/")[1]);
  if (file.mimetype.split("/")[1] === "mp4") {
    cb(null, true);
  } else {
    cb(new Error("Not a video file"), false);
  }
};
// exports.videoUploads = videoUpload.single("video");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    cb(null, (req.video = `/${file.fieldname}${Date.now()}.${ext}`));
    // console.log(req.video);
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadVideos = upload.any("video");

exports.videos = async (req, res) => {
  try {
    videos = await VideoModel.create({ name: req.body.name, video: req.video });

    res.status(200).json({ status: "sucess", videos });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.viewVideos = async (req, res) => {
  try {
    videos = await VideoModel.find();
    console.log(videos);

    // let data = fs.readFileSync(path.resolve(`${videos.video}`));
    // video = await fs.open(videos.video);
    // console.log(video);
    res.status(200).json({ status: "sucess", videos });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.dashboard = async (req, res) => {
  try {
    user = await userModel.find();
    bookings = await BookingFlightModel.find();
    if (!bookings) {
      throw new Error("no bookings found");
    }
    res.status(200).json({
      status: "sucess",
      user: user.length,
      bookings: bookings.length,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
