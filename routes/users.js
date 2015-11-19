var express = require('express');
var router = express.Router();


var model = require('../controllers/user_controller.js');

/* GET users listing. */
router.get('/a', model.index);

module.exports = router;
