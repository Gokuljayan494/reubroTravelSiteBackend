const AgentModel = require("../model/agentModel");
const jwt = require("jsonwebtoken");
const multer = require("multer");
let jwtToken = async (id) => {
  token = jwt.sign({ id }, process.env.jwtSecretKeyAgent, {
    expiresIn: `1d`,
  });
  return token;
};

exports.registerAgent = async (req, res) => {
  try {
    const { email, password, companyName, country, state, city } = req.body;

    const agent = new AgentModel({
      email,
      password,
      companyName,
      country,
      state,
      city,
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
    cb(null, "agentImages");
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

exports.uploadVideos = upload.any("image");

exports.CompleteRegistration = async (req, res) => {
  try {
    res.status(200).json({ status: "sucess" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
