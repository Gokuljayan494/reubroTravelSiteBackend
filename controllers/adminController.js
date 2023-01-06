const AdminModel = require("../model/adminModel");
const userModel = require("../model/userModel");
const sendEmail = require("../controllers/email");
const FlightBookingModel = require("../model/bookingsFlights");
const jwt = require("jsonwebtoken");
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
    // if (req.headers.authorization&&req.)
    data = await userModel.find();
    res.status(200).json({ status: "sucess", data });
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
    await userModel.deleteOne({ _id: id });
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
