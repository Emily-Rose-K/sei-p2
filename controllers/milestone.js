const express = require('express');
const router = express.Router();
const db = require('../models');


// create milestone
router.get('/new', function (req, res) {
    res.render('milestone/new');
})

// delete milestone

// update milestone

module.exports = router;