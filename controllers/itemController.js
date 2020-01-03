let Item = require('../models/item.js');

// Item GET index
export.item_list = function(req, res) {
  res.render('items', { title: 'All Items' });
};

// Item GET display
export.item_display = function(req, res) {
  res.render('item', { title: 'View Item'});
};

// Item GET new form
export.item_new_form = function(req, res) {

};

// Item POST new form
export.item_new_submit = function(req, res) {

};

// Item GET update form
export.item_update_form = function(req, res) {

};

// Item POST update form
export.item_update_submit = function(req, res) {

};

// Item GET delete form
export.item_delete_form = function(req, res) {

};

// Item POST delete form
export.item_delete_submit = function(req, res) {

}
