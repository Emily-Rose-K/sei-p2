const express = require('express');
const router = express.Router();
const db = require('../models');




// create project
router.get('/new/:team', function (req, res) {
    db.goal.findOne({
        where: {
            teamId: req.params.team
        }
    }).then(function(goal) {
        res.render('project/new', {goal});
    })
})

router.post('/new', function (req, res) {
    db.project.create({
        name: req.body.name,
        dateDue: req.body.dateDue,
        goalId: req.body.goal,
        teamId: req.body.team,
        isDone: req.body.isDone
    }).then(function() {
        res.redirect(`/auth/${req.body.team}`)
    })
})

// delete project
router.delete('delete/:id', function(req, res) {
    db.project.findOne({
        where: {
            id: project.id
        }.then(function(){
            res.send(`This will delted project ${project.id}`)
        })
    })
})

// update project

module.exports = router;