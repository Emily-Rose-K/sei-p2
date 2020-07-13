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
router.delete('/:id', function(req, res) {
    db.project.destroy({
        where: {
            id: req.params.id
        },
    })
    .then(function(){
        res.redirect(`/auth/${req.body.team}`)
    })
})


// update project
router.put('/:id'), function(req, res) {
    db.project.update({
        where: {
            id: project.id
        },
    })
    .then(function(project){
        project.descreption = req.params.description
        project.dateDue = req.params.dateDue
    })
    res.redirect(`/auth/${req.body.team}`)
}

module.exports = router;