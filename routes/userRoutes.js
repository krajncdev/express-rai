var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST
 */
router.post('/', userController.create);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

/*
 * SHOW LOGIN
 */
router.get('/login', userController.showLogin);

/*
 * SHOW REGISTER
 */
router.get('/register', userController.showRegister);

/*
 * LOGIN
 */
router.post('/login', userController.login);

module.exports = router;
