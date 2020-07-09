const express = require('express');
const router = express.Router();
const db = require('../models');


// create project
router.get('/new', function (req, res) {
    res.render('project/new');
})

// delete project

// update project

module.exports = router;