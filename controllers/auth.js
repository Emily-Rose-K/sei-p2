
const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require("../config/ppConfig");



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
            console.log(`Yay, you made a team! 👏🏼 ${team.id}`)
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

// team join get route
router.get('/team_join', function(req, res) {
    res.render('auth/team_join');
})

router.post('/team_join', function(req, res) {
    db.team.findOne({
        where: {
            name: req.body.name
        }
    }).then(function(team){
        if (team) {
            console.log("Team was found! 🍕🍕🍕🍕🍕🍕")
            res.redirect(`/auth/register/${team.id}`)
        } else {
            console.log("That team doesn't exist yet. 🖕🏼")
            req.flash(`Looks like there isn't a team called ${req.body.name}.`)
            res.redirect('/auth/join_team');
        }
    }).catch(function(err) {
        console.log(`Error found. \nMessage: ${err.message}. \nPlease review - ${err}`);
        req.flash('error', err.message);
        res.redirect('/auth/register');
    })
})




// register post route
router.post('/register', function(req, res, next) {
    db.team.findOne({
        where: {
            id: req.body.team
        }
    })
    .then(function(team) {
        console.log(`${team}`)
        db.user.findOrCreate({
            where: {
                email: req.body.email,
            },
            defaults: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password
            }
        })
        .then(function([user, created]) {
            // if user was created
            if (created) {
                team.addUser(user)
                console.log("User created! 🎉");
                console.log(`${user.teamId}🍕🍕🍕🍕🍕🍕`)
                passport.authenticate('local', {
                    successRedirect: res.redirect(`/auth/${team.id}`),
                    successFlash: 'Thanks for signing up!'
                })(req, res, next);
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
                res.redirect(`/auth/${user.teamId}`)
            });
        })
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

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

router.get('/:team', function(req, res) {
    db.team.findOne({
        where: {
            id: req.params.team
        }, 
        include: [db.user, db.goal, db.project, db.milestone]
    }).then(function(team) {
        res.render('team', {team})
    })
})


// export router
module.exports = router;