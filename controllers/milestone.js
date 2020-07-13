const express = require('express');
const router = express.Router();
const db = require('../models');




// create milestone
router.get('/new/:team', function (req, res) {
    db.project.findOne({
        where: {
            teamId: req.params.team
        }
    }).then(function(project) {
        res.render('milestone/new', {project});
    })
})

router.post('/new', function(req, res) {
    db.milestone.create({
        description: req.body.description,
        dateDue: req.body.dateDue,
        projectId: req.body.project,
        teamId: req.body.team,
        isDone: req.body.isDone
    }).then(function() {
        res.redirect(`/auth/${req.body.team}`)
    })
})

// delete milestone
router.delete('delete/:id', function(req, res) {
    db.milestone.findOne({
        where: {
            id: milestone.id
        }.then(function(){
            res.send(`This will delted goal ${milestone.id}`)
        })
    })
})

// update milestone

module.exports = router;