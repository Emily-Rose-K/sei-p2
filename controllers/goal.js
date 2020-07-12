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
    db.team.findOne({
        where: {
            id: req.body.id
        }
    })
    .then(function(team) {
        db.team.createGoal ({
            description: req.body.description,
            dueDate: req.body.dueDate
        })
        res.redirect(`/auth/${team.id}`)
    })
})


// delete goal

// update goal




module.exports = router;
