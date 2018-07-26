const express = require('express');
const router = express.Router();

//Bring in Books
let Book = require('../models/book');

// User Model
let User = require('../models/user');

//Get all Books
router.get('/', (req, res) => {
    Book.find((err, data) => {
        if (err) console.log(err);
        res.json(data);
    })
})

//Add Route
//ensureAuthenticated,
router.get('/add', (req, res) => {
    Book.find((err, data) => {
        if (err) console.log(err);
        res.json(data);
    })
});

//Add Submit POST Route
router.post('/add', (req, res) => {
    req.checkBody('isbn', 'ISBN is required').notEmpty;
    req.checkBody('title', 'Title is required').notEmpty;
    req.checkBody('author', 'Author is required').notEmpty;
    req.checkBody('pages', 'Pages is required').notEmpty;
    req.checkBody('description', 'Description is required').notEmpty;
    //here should be image validator

    //Get Errors
    let errors = req.validationErrors();

    if (errors) {
        // res.render('add_article', {
        //     title: 'Add Article',
        //     errors
        // });
    } else {
        let book = new Book();
        book.isbn = req.body.isbn;
        book.title = req.body.title;
        book.author = req.body.author;
        book.pages = req.body.pages;
        book.description = req.body.description;
        book.thumb = req.body.thumb;


        book.save((err) => {
            if (err) return console.log(err);
            else {
                req.flash('success', 'Book Added');
                console.log('book added');
                res.status(200).json({
                    message: 'Book succefully added'
                });
            }
        });
    }
});

//Load Edit Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (book.author != req.user._id) {
            req.flash('danger', 'Not Autorized');
            res.status(404).json({
                message: 'User not found'
            });
        }
        //LOAD Edit VIEW
        // res.render('edit_article', {
        //     title: article.title,
        //     article
        // });
    });
});

//Update Submit POST Route
router.post('/edit/:id', (req, res) => {
    let book = {};
    book.isbn = req.body.isbn;
    book.title = req.body.title;
    book.author = req.user._id;
    book.pages = req.body.pages;
    book.description = req.body.description;
    book.thumb = req.body.thumb;

    let query = {
        _id: req.params.id
    };

    Book.update(query, book, (err) => {
        if (err) return console.log(err);
        else {
            req.flash('success', 'Book Updated');
            res.redirect('/');
        }
    });
});

//Delete Book
router.delete('/:id', (req, res) => {
    //console.log('Delete route: ' + req);

    //proverka za ponataka dali e istiot avtor
    // if (!req.user._id) {
    //     res.status(500).send();
    // }

    let query = {
        _id: req.params.id
    }

    Book.findById(req.params.id, (err, book) => {
        if (book.author != req.body.author) {
            res.status(500).send();
        } else {
            Book.remove(query, (err) => {
                if (err) return console.log(err);
                res.send('Success');
                console.log('book deleted');
            })
        }
    })
});

//Get Single Book
router.get('/:id', (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        User.findById(book.author, (err, user) => {
            // res.render('book', {
            //     book,
            //     author: user.name
            // });
        });
    });
});

//Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next()
    else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}
module.exports = router;