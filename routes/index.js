const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get("/",(req,res)=>{
    res.render('index')
})
// GET login page
router.get('/login', (req, res) => {
    res.render('login');
});

// POST login
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/files/upload', // Redirect to upload page after login
    failureRedirect: '/login',
    failureFlash: true
}));

// GET signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// POST signup
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/files/upload', // Redirect to upload page after signup
    failureRedirect: '/signup',
    failureFlash: true
}));

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

module.exports = router;
