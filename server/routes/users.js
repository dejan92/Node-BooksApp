const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path');

//Bring in User Model
let User = require('../models/user');

//Register Form
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/views/register.html'));
});

//Register Process
router.post('/register', (req, res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody(name, 'Name is required').notEmpty();
    req.checkBody(email, 'Email is required').notEmpty();
    req.checkBody(email, 'Email is not valid').isEmail();
    req.checkBody(username, 'Username is required').notEmpty();
    req.checkBody(password, 'Password is required').notEmpty();
    req.checkBody(password2, 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (false) {
        // res.render('register', {
        //     errors
        // });
        res.redirect('/register');
        console.log('Post metoda na register : ', errors[0]);
    } else {
        let newUser = new User({
            name,
            email,
            username,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) return console.log(err);
                newUser.password = hash;
                newUser.save((err) => {
                    if (err) return console.log(err);
                    else {
                        req.flash('success', 'You are now registered, please log in');
                        res.redirect('/#/login');
                    }
                });
            })
        });
        
    }
    
});

//Deleting Book
router.delete('/:id', (req, res) => {
    console.log('entering delete route')
    let query = {
        _id: req.params.id
    }
    Book.remove(query, (err) => {
        if (err) return console.log(err);
        res.send('Success');
    });
});


//Login Form
router.get('/login', (req, res) => {
    res.redirect('/login');
});

//Login Process
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'You are logged out !');
    res.redirect('/users/login');
});

module.exports = router;