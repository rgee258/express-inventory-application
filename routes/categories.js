var express = require('express');
var router = express.Router();

router.get('/', controller.category_list);

router.get('/:categoryId', controller.category_display);

router.get('/new', controller.category_new_form);

router.post('/new', controller.category_new_submit);

router.get('/update', controller.category_update_form);

router.post('/update', controller.category_update_submit);

router.get('/delete', controller.category_delete_form);

router.post('/delete', controller.category_delete_submit);

module.exports = router;
