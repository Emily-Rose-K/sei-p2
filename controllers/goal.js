const express = require('express');
const router = express.Router();
var methodOverride = require('method-override');
router.use(methodOverride('_method'));
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

router.post('/new', function(req, res) {
        db.goal.create({
            description: req.body.description,
            dateDue: req.body.dateDue,
            teamId: req.body.team
        })
        .then(function() {
            res.redirect(`/auth/${req.body.team}`)
        })
    })



// delete goal

router.delete('/delete/:id', function(req, res) {
    db.goal.findOne({
        where: {
            id: goal.id
        }.then(function(){
            res.redirect(`/auth/${req.body.team}`)
        })
    })
})


router.get('/edit/:id', function(req,res) {
    db.goal.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(goal) {
        res.render('goal/edit', {goal});
    })
})

// update goal
router.put('/:id', function(req, res) {
    db.goal.findOne({
        where: {
        id: req.params.id 
        } 
    })
    .then(function (goal) {
        if (goal) {
            goal.update({
                description: req.body.description,
                dateDue: req.body.dateDue
            })
            res.redirect(`/auth/${req.body.team}`)
        }
    })
})




module.exports = router;
