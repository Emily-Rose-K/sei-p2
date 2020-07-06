// require express
const express = require('express')
// import router
const router = express.Router();
// import db
const db = require('../models');
// import middleware
const flash = require('flash')
const passport = require('../config/ppConfig');

// register get route
router.get('/register', function(req, res) {
    res.render('auth/register')
})
// register post route
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        // if user was created
        if(created) {
            // authenticate user and start authorization process
            console.log('User created! ⭐️');
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'Welcome to the shit show!'
            }) (req, res);
        } else {
        // else if user is found
        console.log('User email already exists. 💥')
         // send error to user that eamil already exists
         req.flash('Uh-oh! That email is already in use. 📬')
        //redirect back to register get route
        res.redirect('/auth/register')
        }     
    }).catch(function(err) {
        console.log(`Looks like there was a problem.\n Message: ${err.message}. \n Please review - ${err}`)
        req.flash(`error`, err.message);
        res.redirect('/auth/register');
    });
});

// login get route
router.get('/login', function(req, res) {
    res.render('auth/login');
})
// login post route
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        // if no user authenticated
        if(!user) {
            req.flash('error', 'Invalid username or password. 🧞')
            // save to our user session no username
            req.session.save(function(){
                return res.redirect('/auth/login');
            });
            // redirect our user to try logging in again
        }
        if (error) {
            return next(error);
        }
        req.login(user, function(error) {
            // if error move to error
            if (error) next(error);
            // if success flash success message
            req.flash('success', 'You are now logged in.')
            // if success save session and redirect user 
            req.session.save(function() {
                return res.redirect('/');
            })
        });
    })(req, res, next);
});

router.post('/login', passport.authenticate('local', {
    successRedirct: '/',
    failureRedirect: '/auth/login',
    successFlash: 'Welcome to our app! 🌈',
    failureFlash: 'Invalid username or password. 🧞'
}));


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
//export router
module.exports = router;


