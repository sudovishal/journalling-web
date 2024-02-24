const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res) =>
  res.render("login", { title: "Login", error: null })
);

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found, display an error message
    if (!user) {
      return res.render("login", {
        title: "Login",
        error: "Invalid Email or Password",
      });
    }
    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // if password is invalid, display an error message
    if (!isPasswordValid) {
      return res.render("login", {
        title: "Login",
        error: "Invalid email or password",
      });
    }
    token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    res.cookie("jwt", token, { httpOnly: true, secure: true });
    res.redirect("/journals");
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
});
module.exports = router;
