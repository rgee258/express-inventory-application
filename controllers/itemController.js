let Item = require('../models/item.js');
let Category = require('../models/category.js');
const validator = require('express-validator');

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
    .exec(function(err, current_item) {
      if (err) { return next(err); }
      res.render('item', { title: current_item.name, item_display: current_item });
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
exports.item_new_submit = [

  // Field validation
  validator.body('item_name', 'Item name is required.').isLength({ min: 1 }).trim(),
  validator.body('item_description', 'Item description is required.').isLength({ min: 1 }).trim(),
  validator.body('item_category', 'Item must be associated with a provided category.').isLength({ min: 1 }).trim(),
  validator.body('item_price', 'Item is required to have a proper currency format.').isCurrency(),
  validator.body('item_stock', 'Item is required to contain a stock count.').isInt(),

  validator.sanitizeBody('*').escape(),

  (req, res, next) => {

    // Retrieve validation errors
    const errors = validator.validationResult(req);

    // Create new item with provided fields
    let item = new Item(
      {
        name: req.body.item_name,
        description: req.body.item_description,
        category: req.body.item_category,
        price: req.body.item_price,
        stock: req.body.item_stock
      }
    );

    // Handle error by rendering form again with errors
    if (!errors.isEmpty()) {
      Category
        .find({}, 'name id')
        .exec(function(err, categories) {
          if (err) { return next(err); }
          res.render('item_new', { title: 'New Item', category_list: categories, new_item: item, errors: errors.array() });
        });
    } else {
      item.save(function(err) {
        if (err) { return next(err); }
        // Redirect to the new item on success
        res.redirect(item.url);
      });
    }
  }
];

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
exports.item_update_submit = [

  // Field validation
  validator.body('item_name', 'Item name is required.').isLength({ min: 1 }).trim(),
  validator.body('item_description', 'Item description is required.').isLength({ min: 1 }).trim(),
  validator.body('item_category', 'Item must be associated with a provided category.').isLength({ min: 1 }).trim(),
  validator.body('item_price', 'Item is required to have a proper currency format.').isCurrency(),
  validator.body('item_stock', 'Item is required to contain a numerical stock count.').isInt(),

  validator.sanitizeBody('*').escape(),

  (req, res, next) => {

    // Retrieve validation errors
    const errors = validator.validationResult(req);

    // Create new item with provided fields
    let item = new Item(
      {
        name: req.body.item_name,
        description: req.body.item_description,
        category: req.body.item_category,
        price: req.body.item_price,
        stock: req.body.item_stock,
        // Here you need to include the id in params or a new one will be created
        _id: req.params.id
      }
    );

    // Handle error by rendering form again with errors
    if (!errors.isEmpty()) {
      Category
        .find({}, 'name id')
        .exec(function(err, categories) {
          if (err) { return next(err); }
          res.render('item_update', { title: 'Update Item', category_list: categories, current_item: item, errors: errors.array() });
        });
    } else {
      // Unlike saving a new object, here we call findByIdAndUpdate on the model and pass in the item
      Item.findByIdAndUpdate(req.params.id, item, function(err, updatedItem) {
        if (err) { return next(err); }
        // Redirect to the new item on success
        res.redirect(updatedItem.url);
      });
    }
  }
];

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
exports.item_delete_submit = [
  
  validator.body('password', 'Password is required to perform this action.').isLength({ min: 1 }).trim(),

  validator.sanitizeBody('password').escape(),

  (req, res, next) => {

    // Retrieve validation errors
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      Item
        .findById(req.params.id, 'id')
        .exec(function(err, item) {
          if (err) { return next(err); }
          res.render('item_delete', { title: 'Delete Item', current_item: item, errors: errors.array() });
        });
    } else {
      if (req.body.password !== process.env.ADMIN_PASSWORD) {
        Item
          .findById(req.params.id, 'id')
          .exec(function(err, item) {
            if (err) { return next(err); }
            res.render('item_delete', { title: 'Delete Item', current_item: item, denied: "Access denied." });
          });
      } else {
        Item.findByIdAndRemove(req.body.item_id, function(err) {
          if (err) { return next(err); }
          // Redirect to the item list on success
          res.redirect('/items');
        });
      }
    }
  }
];
