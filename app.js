const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
// Import route files
const loginRoute = require('./routes/login.js');
const signupRoute = require('./routes/signup.js');
const logoutRoute = require('./routes/logout.js');
const journalRoute = require('./routes/journals.js')
const authenticateToken = require('./auth.js');
const createJournalRoute = require('./routes/create-journal.js');
const viewJournalRoute = require('./routes/view-journal.js')
const deleteJournalRoute = require('./routes/delete-journal.js')

// Configure body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(methodOverride('_method'))
mongoose.connect('mongodb://localhost:27017/journal');
// Register view engine
app.set('view engine', 'ejs');


// app.use(express.static('public'));

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
app.use('/', authenticateToken, viewJournalRoute)
app.use('/', authenticateToken ,deleteJournalRoute)
app.listen(3000);
