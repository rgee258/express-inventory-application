let Item = require('../models/item.js');
let Category = require('../models/category.js');

// Item GET index
exports.item_list = function(req, res, next) {
  Item
    .find({}, 'name url')
    .exec(function(err, all_items) {
      if (err) { return next(err); }
      res.render('items', { title: 'All Items', item_list: all_items });
    });
};

// Item GET display
exports.item_display = function(req, res, next) {
  Item
    .findById(req.params.id)
    .populate('category')
    .exec(function(err, item) {
      if (err) { return next(err); }
      res.render('item', { title: item.name, item_display: item});
    });
};

// Item GET new form
exports.item_new_form = function(req, res, next) {
  Category
    .find({}, 'name id')
    .exec(function(err, categories) {
      if (err) { return next(err); }
      res.render('item_new', { title: 'New Item', category_list: categories });
    });
};

// Item POST new form
exports.item_new_submit = function(req, res, next) {

};

// Item GET update form
exports.item_update_form = function(req, res, next) {
  Category
    .find({}, 'name id')
    .exec(function(err, categories) {
      Item
        .findById(req.params.id)
        .exec(function(err, item) {
          if (err) { return next(err); }
          res.render('item_update', { title: 'Update Item', category_list: categories, current_item: item });
        });
    });
};

// Item POST update form
exports.item_update_submit = function(req, res, next) {

};

// Item GET delete form
exports.item_delete_form = function(req, res, next) {
  Item
    .findById(req.params.id, 'id')
    .exec(function(err, item) {
      if (err) { return next(err); }
      res.render('item_delete', { title: 'Delete Item', current_item: item });
    });
};

// Item POST delete form
exports.item_delete_submit = function(req, res, next) {

}
