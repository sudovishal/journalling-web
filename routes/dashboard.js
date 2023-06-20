const router = require('express').Router();
const authenticateToken = require('./auth.js');
router.get('/', authenticateToken, (req,res) => {
    res.render('dashboard');
  })
module.exports = router;