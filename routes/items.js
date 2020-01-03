var express = require('express');
var router = express.Router();

// Item controller
let controller = require('../controllers/itemController');

router.get('/', controller.item_list);

router.get('/:itemId', controller.item_display);

router.get('/new', controller.item_new_form);

router.post('/new', controller.item_new_submit);

router.get('/update', controller.item_update_form);

router.post('/update', controller.item_update_submit);

router.get('/delete', controller.item_delete_form);

router.post('/delete', controller.item_delete_submit);

module.exports = router;
