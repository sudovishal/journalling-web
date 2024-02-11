const {resetPasswordRequestController, resetPasswordController } = require('../controllers/requestResetPassword.controller');

const router = require("express").Router();

//   router.post("/auth/signup", signUpController);
router.post("/requestResetPassword", resetPasswordRequestController);
  router.post("/password-reset", resetPasswordController);

module.exports = router;