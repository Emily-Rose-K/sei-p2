const express = require('express');
const router = express.Router();
const db = require('../models');




router.get('/new', function (req, res) {
    res.render('goal/new');
})

// create goal

router.post('/new', function (req, res) {
   db.goal.create ({
       description: req.body.description,
       dueDate: req.body.dueDate
   })
})


// delete goal

// update goal




module.exports = router;
