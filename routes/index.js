var express = require('express');
var router = express.Router();
var async = require('async');

let Item = require('../models/item');
let Category = require('../models/category');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Inventory Manager' });
});

module.exports = router;
