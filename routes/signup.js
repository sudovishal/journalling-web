const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

router.get('/', (req, res) => {
  res.render('signup', { title: 'Sign Up', error: null });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', {
        error: 'Email already exists',
        title: 'Sign Up',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.send('Welcome to Journalling');
  } catch (error) {
    console.error(error);
    res.redirect('/signup');
  }
});

module.exports = router;
