var express = require('express');
var router = express.Router();
var data = JSON.parse(fs.readFileSync('./data-init/lifts.json', 'UTF-8'));
var model = require('../models/lifts')(data);

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/lifts/:type', function (req, res) {
    res.json();
});

router.get('/lifts/status/:status', function (req, res) {

});

router.get('/lifts/capacity/:capacity', function (req, res) {

});

router.get('/lift/:name', function (req, res) {

});

router.put('/lift/:name', function (req, res) {

});

module.exports = router;
