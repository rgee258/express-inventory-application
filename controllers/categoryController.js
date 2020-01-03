let category = require('../models/category.js');

// Category GET index
export.category_list = function(req, res) {
  res.render('categories', { title: 'All Categories' });
};

// Category GET display
export.category_display = function(req, res) {
  res.render('category', { title: 'View Category'});
};

// Category GET new form
export.category_new_form = function(req, res) {

};

// Category POST new form
export.category_new_submit = function(req, res) {

};

// Category GET update form
export.category_update_form = function(req, res) {

};

// Category POST update form
export.category_update_submit = function(req, res) {

};

// Category GET delete form
export.category_delete_form = function(req, res) {

};

// Category POST delete form
export.category_delete_submit = function(req, res) {

}
