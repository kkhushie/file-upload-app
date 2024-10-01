const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage

// Ensure user is authenticated middleware
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Upload Route
router.get('/upload', ensureAuthenticated, (req, res) => {
    res.render('upload',{ username: req.user.username }); // Render the upload view
});

// File Upload Handling
router.post('/upload', ensureAuthenticated, upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        req.flash('error_msg', 'Please upload a file.');
        return res.redirect('/upload');
    }

    // Render preview with the uploaded file
    res.render('preview', { file: file }); // Pass the file for preview
});

// Preview Route
router.get('/preview', ensureAuthenticated, (req, res) => {
    res.render('preview'); // Render the preview view
});

module.exports = router;
