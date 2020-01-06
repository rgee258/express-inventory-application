var express = require('express');
var router = express.Router();
var async = require('async');

let Item = require('../models/item');
let Category = require('../models/category');

/* GET home page. */
router.get('/', function(req, res) {

  async.parallel({
    // Idea of approaching referencing an object by id:
    //   https://stackoverflow.com/questions/36201689/mongoose-find-a-document-by-reference-property
    // Then query chaining using prior results, see second answer:
    //   https://stackoverflow.com/questions/20699947/how-to-return-query-results-to-a-variable-using-mongoose/20702542
    fresh_water_count: function(callback) {
      Category
        .findOne({ name: 'Fresh Water' }, '_id')
        .exec(function(err, category) {
          Item.countDocuments({ 'category': category.id }, callback);
        });
    },
    salt_water_count: function(callback) {
      Category
        .findOne({ name: 'Salt Water' }, '_id')
        .exec(function(err, category) {
          Item.countDocuments({ 'category': category.id }, callback);
        });
    },
  }, function(err, results) {
    res.render('index', { title: 'Express', error: err, data: results });
  });
});

module.exports = router;
