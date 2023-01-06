const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

let agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    // required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
adminSchema.methods.checkPassword = async function (
  inputtedPassword,
  currentPassword
) {
  console.log(await bcrypt.compare(currentPassword, inputtedPassword));
  return await bcrypt.compare(currentPassword, inputtedPassword);
};
adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
});
AgentModel = mongoose.model("Agent", agentSchema);
module.exports = AgentModel;
