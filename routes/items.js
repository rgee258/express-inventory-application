var express = require('express');
var router = express.Router();

// Item controller
let controller = require('../controllers/itemController');

router.get('/', controller.item_list);

router.get('/new', controller.item_new_form);

router.post('/new', controller.item_new_submit);

router.get('/:id/update', controller.item_update_form);

router.post('/:id/update', controller.item_update_submit);

router.get('/:id/delete', controller.item_delete_form);

router.post('/:id/delete', controller.item_delete_submit);

// Remember, order matters so we put :id here so we can properly render our form pages
router.get('/:id', controller.item_display);

module.exports = router;
