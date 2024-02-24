import { requestPasswordReset } from "../requestPasswordReset.service.js";
// const requestPasswordReset = require("");
import { resetPassword } from "../resetPassword.service.js";
// const resetPassword = require("../resetPassword.service");

export const resetPasswordRequestController = async (req, res) => {
  const requestPasswordResetService = await requestPasswordReset(
    req.body.email
  );
  return res.json(requestPasswordResetService);

};

export const resetPasswordController = async (req, res, next) => {
  const resetPasswordService = await resetPassword(
    req.body._id,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};

// module.exports = { resetPasswordRequestController, resetPasswordController };
// export default { resetPasswordRequestController, resetPasswordController };
