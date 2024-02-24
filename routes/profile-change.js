import express from "express";
const router = express.Router();
import User from "../models/User.model.js";
import validator from "validator";
// const router = require("express").Router();
// const User = require("../models/User.model");
// const validator = require("validator");

router.get("/profile", (req, res) => {
  res.render("profile-change", { emailError: null });
});

router.post("/profile", async (req, res) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    return res.render("profile-change", {
      emailError: "Invalid email format",
      title: "Profile Change",
    });
  }
  try {
    // Check if the email already exists in the database for a different user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.email !== req.user.email) {
      return res.render("profile-change", {
        emailError: "Email already taken",
        title: "Profile Change",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { email: email },
      { new: true }
    );

    // Handle the case when the user is not found
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    // Redirect to the user's profile page or display a success message

    res.redirect("/journals");
  } catch (error) {
    console.error(error);
    res.redirect("/profile"); // Redirect to the profile page in case of an error
  }
});

export default router;
