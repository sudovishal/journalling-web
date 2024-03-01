const requestPasswordReset = require("../requestPasswordReset.service");
const resetPassword = require("../resetPassword.service");

const resetPasswordRequestController = async (req, res) => {
  const requestPasswordResetService = await requestPasswordReset(
    req.body.email
  );
  return res.json(requestPasswordResetService);
};

const resetPasswordController = async (req, res, next) => {
  const resetPasswordService = await resetPassword(
    req.body._id,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};

module.exports = { resetPasswordRequestController, resetPasswordController };

