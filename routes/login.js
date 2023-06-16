const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Add any login route logic here

module.exports = router;
