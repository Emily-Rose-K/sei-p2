const express = require('express');
const router = express.Router();
const db = require('../models');


// // display a specific teams team
router.get('/team/:id', function(req, res) {
    db.team.findOne({
        where: { id: req.params.id},
        include: [db.goal, db.project, db.milestone, db.user]
    })
    .then(function(team) {
        if (!team) throw Error()
        res.render('/login')
    })
    .catch(function(error) {
        console.log(error)
    })
})


module.exports = router;