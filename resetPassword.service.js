const sendEmail = require("./utils/sendEmail.js");
const Token = require("./models/Token.model.js");
const User = require("./models/User.model.js");
const bcrypt = require("bcrypt");

const resetPassword = async (userId, token, password) => {
  // console.log(userId, token, password);
  let passwordResetToken = await Token.findOne({ userId });
  // console.log(userId, passwordResetToken);
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  // console.log(passwordResetToken.token, token);

  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) throw new Error("Invalid or expired password reset token");

  const bcryptSalt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.email,
    },
    "../template/resetPassword.ejs"
  );
  await passwordResetToken.deleteOne();

  return { success: true, message: "Password reset was successful" };
};

module.exports = resetPassword;
