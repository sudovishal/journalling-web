import express from 'express';
const app = express();
import connectDB from './db.js';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

// import route files
import loginRoute from './routes/login.js';
import signupRoute from './routes/signup.js';
import logoutRoute from './routes/logout.js';
import journalRoute from './routes/journals.js';
import authenticateToken from './auth.js';
import createJournalRoute from './routes/create-journal.js';
import viewJournalRoute from './routes/view-journal.js';
import deleteJournalRoute from './routes/delete-journal.js';
import editJournalRoute from './routes/edit-journal.js';
import profileChange from './routes/profile-change.js';
import passwordResetRoute from './routes/password-reset.js';
import shareableLink from './routes/public-link.js';

// Configure body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

connectDB(); // Database connection

// Register view engine
app.set("view engine", "ejs");
app.set("template", "./template");

// app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Mount the login routes
app.use("/login", loginRoute);
// Mount the signup routes
app.use("/signup", signupRoute);
app.use("/journals", authenticateToken, journalRoute);
app.use("/journals/", authenticateToken, createJournalRoute);
app.use("/", logoutRoute);
app.use("/journals", authenticateToken);
app.use("/journals", viewJournalRoute);
app.use("/journals", authenticateToken, deleteJournalRoute);
app.use("/journals", authenticateToken, editJournalRoute);
app.use("/", authenticateToken, profileChange);
app.use("/", passwordResetRoute);
app.use("/", shareableLink);
app.listen(port);
