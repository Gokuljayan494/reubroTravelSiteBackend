const AgentModel = require("../model/agentModel");

let jwtToken = async (id) => {
  token = jwt.sign({ id }, process.env.jwtSecretKeyAdmin, {
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
    agent = await AgentModel.findByOne({ email }).select("+password");
    if (!agent) {
      throw new Error("no agent Found");
    }

    if (!(await agent.checkPassword(agent.password, password))) {
      throw new Error("incorrect credentials");
    }
    token = await jwtToken(agent._id);

    res.status(200).json({
      status: "Sucess",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: `Error:${err.message}` });
  }
};
