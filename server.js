const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const connectDB = require('./config/db');
require('dotenv').config();
require('./config/auth'); // Import auth config
const fileroute = require("./routes/fileRoutes");
const indexroutes = require("./routes/index");

const app = express();
const port =process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ 
    secret: process.env.SESSION_SECRET || 'your_secret', // Use environment variable for security
    resave: false, 
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// EJS View Engine
app.set('view engine', 'ejs');

// Home Route

// File Routes
app.use('/files', fileroute); // Use your file routes
app.use('/',indexroutes)
// Start the Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
