const express = require('express')
const app = express();
app.listen(3000)

// register view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));

app.get('/',(req,res) => {
res.send("My journalling Website")
})

app.get('/login',(req,res)=> {
    res.render('login', {title : 'Login'})
})

app.get('/signup',(req,res) => {
    res.render('signup', {title : 'Sign up'})
})

app.get('forgot-password',(req,res) => {
    res.render('forgotpassword');
})

