const router = require('express').Router();
const User = require('../models/user')
const Token = require('../models/token')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const sendEmail = require('./sendEmail')

router.get('/', (req, res) => {
    res.render('password-reset', {msg : "Enter your email address and we'll send you an email with instructions to reset your password."});
  });


const requestPasswordReset = async(email) => {
    const user = await User.findOne( {email});

    if(!user) throw new Error("User does not exist")
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    await new Token({
userId: user._id,
token : hash,
createdAt : Date.now()
}).save()
const link = `localhost:3000/passwordReset?token=${resetToken}&id=${user._id}`;
sendEmail(
    user.email,
    "password reset request",
    {link : link},
    "../views/requestResetPassword.ejs");
    return {link};
}


// router.post('/',(req,res) => {

// })
module.exports = router;