const express = require('express');
const router = express.Router();

//Bring in Books
let Book = require('./models/book');

//Add Route
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    });
});

module.exports = router;