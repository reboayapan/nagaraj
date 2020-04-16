const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
    var jsonData = require('../json/matches/categories.json');
    res.json(jsonData);
});

router.get('/results', (req, res) => {
    var jsonData = require('../json/matches/matches.json');
    res.json(jsonData);
});

router.get('/recommended-profiles', (req, res) => {
    var jsonData = require('../json/matches/recommendations.json');
    res.json(jsonData);
});

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('Matches API');
});

module.exports = router;