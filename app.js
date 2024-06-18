const express = require("express");
const app = express();
const connectDB = require("./db");
require("dotenv").config();

const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
// import route files
const loginRoute = require("./routes/login.js");
const signupRoute = require("./routes/signup.js");
const logoutRoute = require("./routes/logout.js");
const journalRoute = require("./routes/journals.js");
const authenticateToken = require("./auth.js");
const createJournalRoute = require("./routes/create-journal.js");
const viewJournalRoute = require("./routes/view-journal.js");
const deleteJournalRoute = require("./routes/delete-journal.js");
const editJournalRoute = require("./routes/edit-journal.js");
const profileChange = require("./routes/profile-change.js");
const passwordResetRoute = require("./routes/password-reset.js");
const shareableLink = require("./routes/public-link");

// Configure body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectDB(); // Database connection

// Register view engine
app.set("view engine", "ejs");
app.set("template", "./template");


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
