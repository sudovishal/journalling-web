const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')
// Import route files
const loginRoute = require('./routes/login.js');
const signupRoute = require('./routes/signup.js');
const logoutRoute = require('./routes/logout.js');
const journalRoute = require('./routes/journals.js')
const createJournalRoute = require('./routes/create-journal.js');
const authenticateToken = require('./auth.js');

// Configure body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
mongoose.connect('mongodb://localhost:27017/journal');
// Register view engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Mount the login routes
app.use('/login', loginRoute);

// Mount the signup routes
app.use('/signup', signupRoute);

app.get('/forgot-password', (req, res) => {
  res.render('forgotpassword');
});
app.use('/journals',authenticateToken, journalRoute);
app.use('/journals/new', authenticateToken, createJournalRoute)
app.use('/',logoutRoute)
app.listen(3000);
