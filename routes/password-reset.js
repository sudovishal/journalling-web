const {
  resetPasswordRequestController,
  resetPasswordController,
} = require("../utils/requestResetPassword.js");
const router = require("express").Router();
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/password-reset", resetPasswordController);

router.get("/reset-password", (req, res) => {
  res.render("reset-password");
});

module.exports = router;
