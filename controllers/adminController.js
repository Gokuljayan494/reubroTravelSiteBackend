const AdminModel = require("../model/adminModel");
const userModel = require("../model/userModel");
const sendEmail = require("../controllers/email");
const path = require("path");
const multer = require("multer");
const VideoModel = require("../model/videoUploadModel");
const formidable = require("formidable");
const fs = require("fs");
const { getVideoDuration } = require("get-video-duration");
const getALLUserFlightBookings = require("../model/userBookingsFlights");

const agentBookingModel = require("../model/agentsBooking");
const agentModel = require("../model/agentModel");
const jwt = require("jsonwebtoken");

//////////////////////////////////////////
user1 = [];

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
    query = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete query[el]);

    // 1B) Advanced filtering

    let queryStr = JSON.stringify(query);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    query = userModel.find(JSON.parse(queryStr));
    // sort

    if (req.query.sort) {
      sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    user = await query.find({ active: true });
    res
      .status(200)
      .json({ status: "sucess", results: user.length, data: { user } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    admin = await AdminModel.findOne({ email }).select("+password");
    if (!admin) {
      throw new Error("invalid admin");
    }

    otp = await admin.createOtp();

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
    let { otp, password, passwordConfirm } = req.body;
    const email = req.params.email;
    console.log(`----`);

    // find the account and compare with the entered otp and save otp in database

    admin = await AdminModel.findOne({ email }).select("+otp");

    // admin.compareOtp(admin.otp, otp);
    if (!admin && !(await admin.compareOtp(admin.otp, otp))) {
      throw new Error("invalid otp or invalid admin");
    }

    // next validation

    // here it checks if the otp we have entered expired or nor

    // is the otpExpires time is greater than date now
    console.log(admin);

    otp = admin.otp;
    console.log(otp);
    admin = await AdminModel.findOne({
      otp,
      otpExpires: { $gte: Date.now() },
    });
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
    console.log(id);
    user = await userModel.findByIdAndUpdate(id, { active: false });

    res.status(200).json({ status: "sucess", message: "user deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.getALLUserFlightBookings = async (req, res) => {
  try {
    flightBookings = await getALLUserFlightBookings.find({ active: true });

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
    videos = await VideoModel.find({ active: true });
    console.log(videos);

    res.status(200).json({ status: "sucess", videos });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.dashboard = async (req, res) => {
  try {
    user = await userModel.find({ active: true });
    agent = await agentModel.find();
    console.log(agent);
    console.log(user);
    if (!agent || !user) {
      throw new Error("not found");
    }
    res.status(200).json({
      status: "sucess",
      user: user.length,
      agent: agent.length,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.getUser = async (req, res) => {
  try {
    id = req.params.id;

    user = await userModel.findById(id);

    res.status(200).json({ status: "sucess", user });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.deleteBookings = async (req, res) => {
  try {
    id = req.params.id;

    await BookingFlightModel.findByIdAndUpdate({ _id: id }, { active: false });

    res.status(200).json({ status: "sucess", message: `Bookings Deleted` });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.getuserBookingDetail = async (req, res) => {
  try {
    id = req.params.userId;

    booking = await getALLUserFlightBookings.findById(id);

    res.status(200).json({ status: "sucess", booking });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.deleteVideos = async (req, res) => {
  try {
    id = req.params.id;

    bookings = await BookingFlightModel.findByIdAndUpdate(
      { id },
      { active: false }
    );

    res.status(200).json({ status: "sucess", message: "video deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.registeredAgents = async (req, res) => {
  try {
    agent = await agentModel.find();
    res.status(200).json({ status: "sucess", agent });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
exports.activateAgents = async (req, res) => {
  try {
    id = req.params.id;
    console.log(id);
    // admin = await agentModel.findOne({ _id: id });
    admin = await agentModel.findOne({ _id: id });
    console.log(admin);
    if (admin.subscribe === false) {
      admin.subscribe = true;
    } else {
      admin.subscribe = false;
    }

    await admin.save({ validateBeforeSave: false });
    res.status(200).json({ status: "sucess", message: "Activated", admin });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
exports.getActivatedAgents = async (req, res) => {
  try {
    query = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete query[el]);

    // 1B) Advanced filtering

    let queryStr = JSON.stringify(query);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    query = agentModel.find(JSON.parse(queryStr));
    // sort

    if (req.query.sort) {
      sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    agent = await query.find({ subscribe: true });

    res.status(200).json({ status: "sucess", agent });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.viewAgent = async (req, res) => {
  try {
    id = req.params.id;

    agent = await agentModel.findById(id);

    res.status(200).json({ status: "sucess", agent });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
exports.deleteAgent = async (req, res) => {
  try {
    id = req.params.id;

    agent = await agentModel.findByIdAndUpdate(
      { _id: id },
      { activate: false }
    );
    if (!agent) {
      throw new Error("agent not deleted");
    }
    res.status(200).json({ status: "sucess", message: "agent deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
exports.addAgentCreditBalance = async (req, res) => {
  try {
    id = req.params.id;
    balance = req.body.balance;
    console.log(balance);
    agent = await agentModel.findByIdAndUpdate(
      { _id: id },
      { balance: balance }
    );

    res.status(200).json({ status: "sucess", agent });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.getAgentBookings = async (req, res) => {
  try {
    await agentBookingModel.find({ active: true });
    res.status(200).json({ status: "sucess", message: "video deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.editProfile = async (req, res) => {
  try {
    id = req.user;
    const { name, email } = req.body;
    // admin can edit name and email
    console.log(id);
    data = await AdminModel.findByIdAndUpdate({ _id: id }, { name, email });

    data = await AdminModel.findByIdAndUpdate({ _id: id }, { name, email });
    res.status(200).json({ status: "sucess", data });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.changePassword = async (req, res) => {
  // need old password
  try {
    id = req.user;
    oldPassword = req.body.oldPassword;
    newPassword = req.body.newPassword;
    passwordConfirm = req.body.confirmPassword;
    console.log(req.body);
    admin = await AdminModel.findById({ _id: id }).select("+password");
    console.log(admin);
    // take password
    adminPassword = admin.password;

    // validate old password

    if (!(await admin.checkPassword(adminPassword, oldPassword))) {
      throw new Error("invalid password");
    }
    admin.password = newPassword;
    admin = await admin.save({ validateBeforeSave: false });

    res.status(200).json({ status: "sucess", admin });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
