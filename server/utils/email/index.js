const nodemailer = require("nodemailer");
const { TemplateEmail } = require("./TemplateResetPassword");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const resetPasswordSender = async ({ userName, emailReceiver, token }) => {
  const subject = "Reset password";
  const html = TemplateEmail({ userName, emailReceiver, token });
  try {
    const info = await sentEmail({ emailReceiver, subject, html });
    return info;
  } catch (error) {
    throw error;
  }
};

// async..await is not allowed in global scope, must use a wrapper
const sentEmail = async ({ emailReceiver, subject, html }) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Le Quang Thien" <${process.env.EMAIL_USER}>`, // sender address
      to: emailReceiver,
      subject: subject,
      html: html,
    });
    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  resetPasswordSender,
};
