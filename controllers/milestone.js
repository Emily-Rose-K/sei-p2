const express = require('express');
const router = express.Router();
const db = require('../models');




// create milestone
router.get('/new', function (req, res) {
    res.render('milestone/new');
})

router.post('/new', function(req, res) {
    //find project milestone is on
    //add milestone
    //render project page.
})

// delete milestone

// update milestone

module.exports = router;