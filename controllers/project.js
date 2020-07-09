const express = require('express');
const router = express.Router();
const db = require('../models');




// create project
router.get('/new', function (req, res) {
    res.render('project/new');
})

router.post('/new', function (req, res) {
    // find the goal that project is attached to 
    // create project on that goal
    // rednder profile 
})

// delete project

// update project

module.exports = router;