const { SMTPClient } = require('emailjs')
const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require("../config/ppConfig");

 
const client = new SMTPClient({
    user: process.env.GMAILUSER,
    password: process.env.GMAILPSWD,
    host: 'smtp.gmail.com',
    port: '465',
    ssl: true,
});

//get started flow
router.get('/get_started', function(req, res) {
    res.render('auth/get_started')
})


// team register get route
router.get('/team_register', function(req, res) {
    res.render('auth/team_register');
})
// team register post route
router.post('/team_register', function(req, res) {
    db.team.findOrCreate({
        where: {
            name: req.body.name
        }
    }).then(function([team, created]) {
        //if team created
        if(created) {
            console.log("Yay, you made a team! 👏🏼")
            client.send(
                {
                    text: 'new fix',
                    from: 'gmailuser',
                    to: `${req.body.email}`,
        
                    subject: 'testing emailjs',
                }, (err, message) => {
                console.log(err, "🎷" || message);
            })
            res.redirect('/profile')
        } else {
            console.log("That name is taken 🖕🏼")
            req.flash(`Looks like there is already a team called ${req.body.name}, try a different name.`)
            res.redirect('/auth/team_register');
        } 
    }).catch(function(err) {
        console.log(`Error found. \nMessage: ${err.message}. \nPlease review - ${err}`);
        req.flash('error', err.message);
        res.redirect('/auth/register');
    })
})


// register get route
router.get('/register', function(req, res) {
    res.render('auth/register');
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
        if (created) {
            console.log("User created! 🎉");
            passport.authenticate('local', {
                successRedirect: '/auth/team_register',
                successFlash: 'Thanks for signing up!'
            })(req, res);
        } else {
            console.log("User email already exists 🚫.");
            req.flash('error', 'Error: email already exists for user. Try again.');
            res.redirect('/auth/register');
        }
    }).catch(function(err) {
        console.log(`Error found. \nMessage: ${err.message}. \nPlease review - ${err}`);
        req.flash('error', err.message);
        res.redirect('/auth/register');
    })
})


// login get route
router.get('/login', function(req, res) {
    res.render('auth/login');
});

// login post route
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        // if no user authenticated
        if (!user) {
            console.log('invalid username or password, 🦧')
            req.flash('error', 'Invalid username or password');
            return res.redirect('/auth/login');
        }
        if (error) {
            return next(error);
        }

        req.login(user, function(error) {
            // if error move to error
            if (error) next(error);
            // if success flash success message
            req.flash('success', 'You are validated and logged in.');
            // if success save session and redirect user
            req.session.save(function() {
                return res.redirect('/profile');
            });
        })
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// export router
module.exports = router;