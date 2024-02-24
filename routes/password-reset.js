const {resetPasswordRequestController, resetPasswordController } = require('../controllers/requestResetPassword.controller');

const router = require("express").Router();
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/password-reset", resetPasswordController);

router.get("/reset-password", (req, res) => {
  res.render("reset-password");
});
module.exports = router;