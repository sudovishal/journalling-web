const nodemailer = require("nodemailer");
const ejs = require("ejs");
// const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template, clientURL) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let options = {};
    ejs.renderFile(path.join(__dirname, template), payload, {}, (err, str) => {
      if (err) {
        console.log(err);
      } else {
        options = {
          from: process.env.FROM_EMAIL,
          to: email,
          subject: subject,
          html: str,
        };
      }
    });
    transporter.sendMail(options, (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
