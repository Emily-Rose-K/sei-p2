const { SMTPClient } = require('emailjs')
const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require("../config/ppConfig");
let message = "Hello! I've been using Project Tracker to keep track of all of the goals I share with my team. I'd like for you to join me! You can sign up here: "

 
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
                    text: `${message}`,
                    from: 'Join me in Project Tracker!',
                    to: `${req.body.email}`,
        
                    subject: 'testing emailjs',
                }, (err, message) => {
                console.log(err, "🎷" || message);
            })
            res.redirect(`/auth/register/${team.id}`)
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
router.get('/register/:id', function(req, res) {
    db.team.findOne({
        where: {
           id: req.params.id
        }
    }).then(function(team) {
        res.render('auth/register', {team});
    })
})
// register post route
router.post('/register', function(req, res) {
    db.team.findOne({
        where: {
            id: req.body.team
        }
    })
    .then(function(team) {
        db.user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }) 
    })
    .then(function([user, created]) {
        // if user was created
        if (created) {
            team.addUser(user)
            console.log("User created! 🎉");
            passport.authenticate('local', {
                successRedirect: res.redirect(`/${user.teamId}`),
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
                db.team.findOne({
                    where: {
                        teamId: req.user.teamId
                    }, 
                }) 
                res.redirect(`/${user.teamId}`)
            });
        })
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/:team', function(req, res) {
    db.team.findOne({
        where: {
            id: req.params.team
        }, 
        include: [db.user, db.goal]
    }).then(function(team) {
        res.render('team', {team})
    })
})


// export router
module.exports = router;