var express = require('express');

var router = express.Router();
var userController = require('../controllers/userController.js');

/*
 * GET
 */
router.get('/', userController.list);

/*
 * POST
 */
router.post('/', userController.create);

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

/*
 * LOGOUT
 */
router.get('/logout', userController.logout);

/*
 * MYPROFILE
 */
router.get('/profile', userController.profile);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
