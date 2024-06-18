const {
  resetPasswordRequestController,
  resetPasswordController,
} = require("../utils/requestResetPassword.js");
const router = require("express").Router();

router.get("/req-reset-password", (req, res) => {
  res.render("request-reset-password", {success: false});
});

router.post("/req-reset-password", resetPasswordRequestController);

router.get("/password-reset", (req, res) => {
  const { token, userId } = req.query;
  console.log(token, userId)
  res.render("password-reset", {token, userId});
})

router.post("/password-reset", resetPasswordController);

module.exports = router;
