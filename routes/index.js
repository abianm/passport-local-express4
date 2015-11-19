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
  .get(model.register_get)
  .post(model.register_post);

router.route('/login')
  .get(model.login_get)
  .post(passport.authenticate('local'), model.login_post);  



router.get('/logout', model.logout_get);

router.get('/ping', model.ping);

router.get('/users/:id', model.show);


router.post('/upload', upload.single('fileUploaded'), model.upload)

module.exports = router;
