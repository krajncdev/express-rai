var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController.js');

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
router.get('/', questionController.list);

/*
 * GET PUBLISH
 */
router.get('/publish', requiresLogin, questionController.publish);

/*
 * GET
 */
router.get('/:id', questionController.show);

/*
 * POST
 */
router.post('/', questionController.create);

/*
 * PUT
 */
router.put('/:id', questionController.update);

/*
 * DELETE
 */
router.delete('/:id', questionController.remove);

module.exports = router;
