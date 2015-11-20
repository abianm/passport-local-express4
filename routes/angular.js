var express = require('express');
var router = express.Router();
var path = require('path');


/* GET users listing. */
router.get('/', function (req, res) {
  res.render('angular/index');
});

router.get('/users', function (req, res) {
  debugger;
  res.status(200).json({names: [
    {name:'pepe'},
    {name:'juan'},
    {name:'fran'},
    ]});
});


router.get('/date', function (req, res) {
  debugger;
  res.status(200).json(new Date());
});

module.exports = router;
