const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const AWS = require("aws-sdk");
const adminRouter = require("./routes/adminRouter");
const agentRouter = require("./routes/agentRouter");
const userRouter = require("./routes/userRouter");
const mystiflyRouter = require("./routes/mystiflyRouter");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose");
const ffprobe = require("@ffprobe-installer/ffprobe");
const axios = require("axios");

//////////////////////
// app.use("/uploads/users", express.static("/uploads/users"));
// express.static(path.join(__dirname, "public"));
console.log(path.join(__dirname + "/images"));
app.use(express.static(path.join(__dirname + "/images")));

app.use(express.json());
app.use(cors());
dotenv.config({ path: "./config.env" });

mongoose
  .connect(
    `mongodb+srv://gokuljayan:${process.env.MONGO_PASSWORD}@cluster0.i1euis7.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((con) => {
    console.log(`db connected`);
  })
  .catch((err) => {
    console.log(`Error:${err.message}`);
  });
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/agent", agentRouter);
app.use("/api/v1/mystifly", mystiflyRouter);

/////////////////////////

app.listen("3000", () => {
  console.log(`server started at port 3000`);
});
