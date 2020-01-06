var express = require('express');
var router = express.Router();

// Category controller
let controller = require('../controllers/categoryController.js');

router.get('/', controller.category_list);

router.get('/new', controller.category_new_form);

router.post('/new', controller.category_new_submit);

router.get('/:id/update', controller.category_update_form);

router.post('/:id/update', controller.category_update_submit);

router.get('/:id/delete', controller.category_delete_form);

router.post('/:id/delete', controller.category_delete_submit);

// Remember, order matters so we put :id here so we can properly render our form pages
router.get('/:id', controller.category_display);

module.exports = router;
