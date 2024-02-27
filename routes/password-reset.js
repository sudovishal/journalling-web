import { resetPasswordRequestController, resetPasswordController } from "../controllers/requestResetPassword.controller.js";
// const router = require("express").Router();
import express from 'express';
const router = express.Router();
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/password-reset", resetPasswordController);

router.get("/reset-password", (req, res) => {
  res.render("reset-password");
});
export default router;