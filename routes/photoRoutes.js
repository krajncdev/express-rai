var express = require('express');
var router = express.Router();
var photoController = require('../controllers/photoController.js');

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page');
    err.status = 401;
    return next(err);
  }
}

/*
 * GET
 */
router.get('/', photoController.list);

/*
 * GET
 */
router.get('/:id', photoController.show);

/*
 * POST
 */
router.post('/', requiresLogin, upload.single('image'), photoController.create);

/*
 * PUT
 */
router.put('/:id', photoController.update);

/*
 * DELETE
 */
router.delete('/:id', photoController.remove);

/*
 * SHOW PUBLISH
 */
router.get('/publish', requiresLogin, photoController.publish);

module.exports = router;
