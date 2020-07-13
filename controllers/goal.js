const express = require('express');
const router = express.Router();
const db = require('../models');




router.get('/new/:team', function (req, res) {
    db.team.findOne({
        where: {
            id: req.params.team
        }
    }).then(function(team) {
        res.render('goal/new', {team});
    })
})


// create goal

router.post('/new', function (req, res) {
        db.goal.create ({
            description: req.body.description,
            dateDue: req.body.dateDue,
            teamId: req.body.team
        })
        .then(function() {
            res.redirect(`/auth/${req.body.team}`)
        })
    })



// delete goal

// update goal




module.exports = router;
