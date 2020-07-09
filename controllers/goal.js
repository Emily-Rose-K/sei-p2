const express = require('express');
const router = express.Router();
const db = require('../models');



router.get('/new', function (req, res) {
    res.render('goal/new');
})

// create goal

router.post('/new', function (req, res) {
    // find the team I'm on
    //create a goal for that team
    //render the profile page
})


// delete goal

// update goal


module.exports = router;