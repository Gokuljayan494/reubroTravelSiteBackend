// const API_KEY = ``;

// const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

// sgMail.setApiKey(
//   "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"
// );

const sendEmail = async (options) => {
  try {
    console.log(`hey`);
    // 1) Create a transporter
    console.log(options);
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    // 2) Define the email options
    const mailOptions = {
      from: "GOKULJAYAN494@GMAIL.com",
      to: options,
      subject: "Welcome to travel Site",
      html: "<strong>Welcome to travel site <br> <h6>Offers For You</h6></strong>",
    };

    // 3) Actually send the email
    console.log(await transporter.sendMail(mailOptions));
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
