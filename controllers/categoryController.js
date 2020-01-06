let Category = require('../models/category.js');

// Category GET index
exports.category_list = function(req, res, next) {
  Category
    .find({}, 'name url')
    .exec(function(err, all_categories) {
      if (err) { return next(err); }
      res.render('categories', { title: 'All Categories', category_list: all_categories });
    });
};

// Category GET display
exports.category_display = function(req, res, next) {
  Category
    .findById(req.params.id)
    .exec(function(err, category) {
      if (err) { return next(err); }
      res.render('category', { title: category.name, category_display: category});
    });
};

// Category GET new form
exports.category_new_form = function(req, res, next) {
  res.render('category_new', { title: 'New Category' });
};

// Category POST new form
exports.category_new_submit = function(req, res, next) {

};

// Category GET update form
exports.category_update_form = function(req, res, next) {
  Category
    .findById(req.params.id)
    .exec(function(err, category) {
      if (err) { return next(err); }
      res.render('category_update', { title: 'Update Category', current_category: category });
    });
};

// Category POST update form
exports.category_update_submit = function(req, res, next) {

};

// Category GET delete form
exports.category_delete_form = function(req, res, next) {
  Category
    .findById(req.params.id, 'id')
    .exec(function(err, category) {
      if (err) { return next(err); }
      res.render('category_delete', { title: 'Delete Category', current_category: category });
    });
};

// Category POST delete form
exports.category_delete_submit = function(req, res, next) {

}
