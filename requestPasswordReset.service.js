const User = require("./models/User.model.js");
const Token = require("./models/Token.model.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("./utils/sendEmail.js");

require("dotenv").config();
const clientURL = process.env.CLIENT_URL;

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User does not exist");

  let token = await Token.findOne({ userId: user._id });

  if (token) {
    await token.deleteOne();
  }
  let resetToken = crypto.randomBytes(32).toString("hex");
  const bcryptSalt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
console.log(resetToken, hash)
  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/password-reset?token=${encodeURIComponent(resetToken)}&userId=${encodeURIComponent(user._id)}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.email,
      userId: encodeURIComponent(user.id),
      link: link,
      // clientURL: clientURL,
      resetToken: resetToken,
    },
    "../template/requestPasswordReset.ejs"
  );
  console.log(link)
  return { success: true, message: "Password reset email sent successfully", link };
};

module.exports = requestPasswordReset;