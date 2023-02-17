const AgentModel = require("../model/agentModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const agentBookingModel = require("../model/agentsBooking");
const mongoose = require("mongoose");
let jwtToken = async (id) => {
  token = jwt.sign({ id }, process.env.jwtSecretKeyAgent, {
    expiresIn: `1d`,
  });
  return token;
};

exports.registerAgent = async (req, res) => {
  try {
    const { email, password, companyName, country, state, city, mobile } =
      req.body;

    const agent = new AgentModel({
      email,
      password,
      companyName,
      country,
      state,
      city,
      mobile,
    });

    await agent.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "Sucess",
      data: {
        agent,
        message: "Registered",
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // console.log(await AgentModel.findOne({ email }));
    console.log(await AgentModel.findOne({ email }));
    agent = await AgentModel.findOne({ email }).select("+password");
    if (!agent) {
      throw new Error("no agent Found");
    }

    if (!(await agent.checkPassword(agent.password, password))) {
      throw new Error("incorrect credentials");
    }
    token = await jwtToken(agent._id);

    res.status(200).json({
      status: "Sucess",
      data: { agent },
      token,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.AgentProtect = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      throw new Error("no token");
    }
    if (!req.headers.authorization.startsWith("Bearer")) {
      throw new Error("sign in first");
    }
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("no token");
    }
    decoded = jwt.verify(token, process.env.jwtSecretKeyAgent);
    if (!token) {
      throw new Error("invalid token ");
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

const multerFilter = (req, file, cb) => {
  console.log(file.mimetype.split("/")[1]);
  if (file.mimetype.split("/")[1] === "jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Not a image file"), false);
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
    console.log(req.video);
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadVideos = upload.any("image");

exports.CompleteRegistration = async (req, res) => {
  try {
    const { ownerName, dob, idProof, tan, licenceNumber, mobile } = req.body;
    if ((ownerName, dob, idProof, tan, licenceNumber, mobile)) {
      throw new Error("please enter the fields");
    }
    const image = req.video;

    console.log(ownerName, dob, idProof, tan, licenceNumber);

    agent = await AgentModel.findByIdAndUpdate(
      { _id: req.user },
      {
        $set: {
          "kyc.ownerName": ownerName,
          "kyc.dob": dob,
          "kyc.idProof": idProof,
          "kyc.tan": tan,
          "kyc.licenceNumber": licenceNumber,
          image,
          mobile,
        },
      }
    );
    agent = await AgentModel.findByIdAndUpdate(
      { _id: req.user },
      {
        $set: {
          "kyc.ownerName": ownerName,
          "kyc.dob": dob,
          "kyc.idProof": idProof,
          "kyc.tan": tan,
          "kyc.licenceNumber": licenceNumber,
          image,
          mobile,
        },
      }
    );
    console.log(agent);
    // agent = await agent.save({ validateBeforeSave: false });
    // console.log(agent);
    res.status(200).json({ status: "sucess", agent });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.agentProfile = async (req, res) => {
  try {
    id = req.user;
    agent = await AgentModel.findById({ _id: id });
    res.status(200).json({ status: "sucess", agent });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.agentBookTicket = async (req, res) => {
  try {
    details = req.body.details;
    agent = req.user;
    const data = Buffer.from(JSON.stringify(details));

    agentBooking = await agentBookingModel.create({ agent, details: data });
    res.status(200).json({ status: "sucess", agentBooking });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.editAgent = async (req, res) => {
  try {
    id = req.user;
    const { email, licenceNumber, tan, idProof, ownerName, dob } = req.body;
    console.log(req.video);
    image = req.video;
    console.log(image);
    agent = await AgentModel.findByIdAndUpdate(
      { _id: req.user },
      {
        $set: {
          "kyc.ownerName": ownerName,
          "kyc.dob": dob,
          "kyc.idProof": idProof,
          "kyc.tan": tan,
          "kyc.licenceNumber": licenceNumber,
          "kyc.ownerName": ownerName,
          image,
          email,
        },
      }
    );

    res.status(200).json({ status: "sucess", agent });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.checkCreditBalance = async (req, res) => {
  try {
    id = req.user;
    console.log(id);

    agent = await AgentModel.findById({ _id: id });
    console.log(agent);

    const amountNeeded = 100;
    if (agent.balance < amountNeeded) {
      throw new Error(
        "please contact travel site and add amount your credit balance is low"
      );
    }

    res.status(200).json({ status: "sucess", message: "Book tickeks" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.agentsBookings = async (req, res) => {
  try {
    id = mongoose.Types.ObjectId(req.user);
    bookings = await agentBookingModel.aggregate([
      {
        $match: { agent: id },
      },
      {
        $lookup: {
          from: "agents",

          localField: "agent",

          foreignField: "_id",
          as: "agent_detailss",
        },
      },
      {
        $unwind: "$agent_detailss",
      },
    ]);

    bookings = bookings.map((el) => {
      return JSON.parse(el.details);
    });
    console.log(bookings);
    data = JSON.stringify(bookings);
    res.status(200).json({ status: "sucess", bookings });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.changePassword = async (req, res) => {
  try {
    id = req.user;
    oldPassword = req.body.oldPassword;
    newPassword = req.body.newPassword;
    passwordConfirm = req.body.confirmPassword;
    agent = await AgentModel.findById({ _id: id }).select("+password");
    // take password
    agentPassword = agent.password;

    // validate old password

    if (!(await agent.checkPassword(agentPassword, oldPassword))) {
      throw new Error("wrong password");
    }
    agent.password = newPassword;
    agent = await agent.save({ validateBeforeSave: false });

    res.status(200).json({ status: "sucess", agent });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};

exports.viewVideo = async (req, res) => {
  try {
    res.status(200).json({ status: "sucess", agent });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
