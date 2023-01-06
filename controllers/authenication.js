const jwt = require("jsonwebtoken");
const AdminModel = require("../model/adminModel");

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
    decoded = jwt.verify(token, process.env.jwtSecretKeyAdmin);
    if (!token) {
      throw new Error("invalid token ");
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
