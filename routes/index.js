"use stricts"
var express     = require('express');
var passport    = require('passport');
var Account     = require('../models/account');
var router      = express.Router();
var model       = require('../controllers/user_controller.js')
var multer      = require('multer')
var upload      = multer({ dest: 'public/uploads/',
                           rename: function (fieldname, filename) {
                                return filename.replace(/\W+/g, '-').toLowerCase();
                            } });

router.get('/', model.index);

router.route('/register')
  .get(model.registerGet)
  .post(model.registerPost);

router.route('/login')
  .get(model.loginGet)
  .post(passport.authenticate('local'), model.loginPost);  



router.get('/logout', model.logoutGet);

router.get('/ping', model.ping);

router.get('/users/:id', model.show);


router.post('/upload', upload.single('fileUploaded'), model.upload)

module.exports = router;
