import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../models/User.model.js';

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/User.model');

router.get('/', (req, res) => {
  res.render('signup', { title: 'Sign Up', emailError: null, passError : null });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', {
        emailError: 'Email already exists',
        title: 'Sign Up',
        passError : null
      }) }
    if(password.length < 8) {
      return res.render('signup', {
        title: 'Sign Up',
        passError: 'Password must be at least 8 characters long',
        emailError : null
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.redirect('/login')
  } catch (error) {
    console.error(error);
    res.redirect('/signup');
  }
});

export default router;
