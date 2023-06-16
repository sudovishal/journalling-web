const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('./models/user.js')
const app = express();

//   configure the body-parser middleware
//  the necessary middleware configured to parse the form data
app.use(express.urlencoded({ extended: true })); 

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/journal');
// register view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));

app.get('/',(req,res) => {
res.render('home.ejs')
})

app.get('/login',(req,res)=> {
    res.render('login', {title : 'Login', error : null}) 
    // used null because the error variable was taking the error context from app.get
    // so like after clicking the Sign up, the error of app.post will be used to display the message. 
})
app.get('/signup', (req,res) =>{
    res.render('signup', {title : 'Sign Up', error : null})
})
app.post('/signup', async (req,res) =>{
    const { email, password} = req.body;
    try {
        // check if the email already exists in the database
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.render('signup', {error: 'Email already exists',title : 'Sign Up'});
        }
        // generate salt for bcrypt
        const salt = await bcrypt.genSalt(10);

        // Hash the password using bcrypt and the generated salt
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user instance with the email and hashed password
        const newUser = new User({ email,password : hashedPassword})
        
        // Save the new user to the database
        await newUser.save();

        res.send("Welcome to Journalling")
    } catch (error) {
        console.error(error);
         res.redirect('/signup');
    }
})
app.get('forgot-password',(req,res) => {
    res.render('forgotpassword');
})

app.listen(3000)