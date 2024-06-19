const requestPasswordReset = require("../requestPasswordReset.service");
const resetPassword = require("../resetPassword.service");

const resetPasswordRequestController = async (req, res) => {
  try {
    const { success, message } = await requestPasswordReset(req.body.email);
    if (success) {
      return res.render("request-reset-password", { success: message })
    }
  } catch (error) {
    return res.render("request-reset-password", {
      success: false,
      message: error.message,
    });
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { userId, token } = req.body; // clutch moment
    const { password } = req.body

    // console.log("userId:", userId);
    // console.log("token:", token);
    const resetPasswordService = await resetPassword(userId, token, password);
    return res.status(200).json(resetPasswordService);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { resetPasswordRequestController, resetPasswordController };

