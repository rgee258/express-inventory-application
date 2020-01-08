let Category = require('../models/category.js');
const validator = require('express-validator');

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
exports.category_new_submit = [

  // Field validation
  validator.body('category_name', 'Category name is required.').isLength({ min: 1 }).trim(),
  validator.body('category_description', 'Category description is required.').isLength({ min: 1 }).trim(),

  validator.sanitizeBody('*').escape(),

  (req, res, next) => {

    // Retrieve validation errors
    const errors = validator.validationResult(req);

    // Create new category with provided fields
    let category = new Category(
      {
        name: req.body.category_name,
        description: req.body.category_description
      }
    );

    // Handle error by rendering form again with errors
    if (!errors.isEmpty()) {
      res.render('category_new', { title: 'New Category', new_category: category, errors: errors.array() });
    } else {
      category.save(function(err) {
        if (err) { return next(err); }
        // Redirect to the new category on success
        res.redirect(category.url);
      });
    }
  }
];

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
exports.category_update_submit = [

  // Field validation
  validator.body('category_name', 'Category name is required.').isLength({ min: 1 }).trim(),
  validator.body('category_description', 'Category description is required.').isLength({ min: 1 }).trim(),

  validator.sanitizeBody('*').escape(),

  (req, res, next) => {

    // Retrieve validation errors
    const errors = validator.validationResult(req);

    // Create new category with provided fields
    let category = new Category(
      {
        name: req.body.category_name,
        description: req.body.category_description,
        _id: req.params.id
      }
    );

    // Handle error by rendering form again with errors
    if (!errors.isEmpty()) {
      res.render('category_update', { title: 'Update Category', current_category: category, errors: errors.array() });
    } else {
      Category.findByIdAndUpdate(req.params.id, category, function(err, updatedCategory) {
        if (err) { return next(err); }
        // Redirect to the new category on success
        res.redirect(updatedCategory.url);
      });
    }
  }
];

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
exports.category_delete_submit = [
  
  validator.body('password', 'Password is required to perform this action.').isLength({ min: 1 }).trim(),

  validator.sanitizeBody('password').escape(),

  (req, res, next) => {

    // Retrieve validation errors
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      Category
        .findById(req.params.id, 'id')
        .exec(function(err, category) {
          if (err) { return next(err); }
          res.render('category_delete', { title: 'Delete Category', current_category: category, errors: errors.array() });
        });
    } else {
      if (req.body.password !== process.env.ADMIN_PASSWORD) {
        Category
          .findById(req.params.id, 'id')
          .exec(function(err, category) {
            if (err) { return next(err); }
            res.render('category_delete', { title: 'Delete Category', current_category: category, denied: "Access denied." });
          });
      } else {
        Category.findByIdAndRemove(req.body.category_id, function(err) {
          if (err) { return next(err); }
          // Redirect to the category list on success
          res.redirect('/categories');
        });
      }
    }
  }
];
